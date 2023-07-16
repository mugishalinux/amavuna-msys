import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Not } from "typeorm";
import * as bcrypt from "bcrypt";

import e from "express";
import { ResponseService } from "../response/response.service";
import { PostDto } from "./post.dto";
import { Post } from "./post.entity";
import { User } from "../user/user/entity/user.entity";
import * as TeleSignSDK from "telesignsdk";
import { Christian } from "../christian/entity/christian.entity";
import { SendPostDto } from "./send.post.dto";

export type Usa = any;
@Injectable()
export class SendPostService {
  private readonly customerId = "F27EB590-26DE-4986-A385-FC6B8AEB7136";
  private readonly apiKey =
    "TA9XUtIVNJ+liARGDLs0DVaIJ6a9vCzEocInXb6XvfOdt12MCqfjD8uod9LMrZOg48mU5uLDeRsybq2IiGe0pA==";
  private readonly restEndpoint = "https://rest-api.telesign.com";
  private readonly timeout = 10 * 1000; // 10 secs
  private readonly client: any;
  constructor() {
    this.client = new TeleSignSDK(
      this.customerId,
      this.apiKey,
      this.restEndpoint,
      this.timeout,
    );
  }

  async getSendPost(data: SendPostDto) {
    //check if a church exist
    const post = await Post.findOne({
      where: { status: Not(8), id: data.post },
    });
    const christian = await Christian.find({
      where: { status: Not(8), user: { id: data.user } },
    });
    let i = 0;
    for (i = 0; i < christian.length; i++) {
      function messageCallback(error: any, responseBody: any) {
        if (error === null) {
          console.log(
            `${post[i].postContent}: ${christian[i].primaryPhone}` +
              ` => code: ${responseBody["status"]["code"]}` +
              `, description: ${responseBody["status"]["description"]}`,
          );
        } else {
          console.error("Unable to send message. " + error);
        }
      }

      this.client.sms.message(
        messageCallback,
        christian[i].primaryPhone,
        post[i].postContent,
        "ARN",
      );
    }
  }
}
