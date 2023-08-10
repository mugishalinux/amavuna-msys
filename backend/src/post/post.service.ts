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
import * as dotenv from "dotenv";
import { Christian } from "../christian/entity/christian.entity";
dotenv.config();
require("dotenv").config();

export type Usa = any;
@Injectable()
export class PostService {
  constructor(private response: ResponseService) {}

  async createPost(data: PostDto) {
    const user = await User.findOne({
      where: { id: data.user, status: Not(8) },
    });
    if (!user)
      throw new BadRequestException(`This user  ${data.user} not found `);

    const christians = await Christian.find({
      where: { status: Not(8), user: { id: user.id } },
    });

    const post = new Post();
    post.user = user;
    post.postTitle = data.postTitle;
    post.postContent = data.postContent;
    post.status = 1;
    post.created_by = 1;
    post.updated_by = 1;

    try {
      const data = await post.save();
      for (let i = 0; i < christians.length; i++) {
        if (christians[i].primaryPhone != null) {
          const number = "+25" + christians[i].primaryPhone;
          const message =
            "\n" +
            "\n" +
            "\n" +
            data.postTitle +
            "\n" +
            "\n" +
            data.postContent;
          const twilio = require("twilio")(
            process.env.SID,
            process.env.AUTHTOKEN,
          );
          await twilio.messages
            .create({
              from: process.env.TWILIONUMBER,
              to: number,
              body: message,
            })
            .then(() => console.log("message has sent"))
            .catch((e) => console.log(e));
        }
      }
      return this.response.postResponse(data.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async getAllPost(id: number) {
    //check if a church exist
    const post = await Post.find({
      where: { status: Not(8), user: { id } },
    });

    return post;
  }

  async getSinglePost(id: number): Promise<Post> {
    //check if a church exist
    const post = await Post.findOne({
      where: { status: Not(8), id: id },
    });
    if (!post) throw new BadRequestException(`Post with ID ${id} not found`);
    return post;
  }

  async deletePost(id: number) {
    //check if a user exist
    const post = await Post.findOne({
      where: { status: Not(8), id: id },
    });
    if (!post) throw new BadRequestException(`Post with ID ${id} not found`);
    try {
      post.status = 8;
      await Post.update(post.id, post);
      return this.response.deleteResponse(post.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async sendSms() {
    const twilio = require("twilio")(process.env.SID, process.env.AUTHTOKEN);
    await twilio.messages
      .create({
        from: process.env.TWILIONUMBER,
        to: "+250783381277",
        body: "hello brother",
      })
      .then(() => console.log("message has sent"))
      .catch((e) => console.log(e));
  }
}
