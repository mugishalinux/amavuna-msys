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
import { Church } from "./church.entity";
import { ChurchDto } from "./church.dto";

export type Usa = any;
@Injectable()
export class ChurchService {
  constructor(private response: ResponseService) {}

  async createChurch(data: ChurchDto) {
    const church = new Church();
    church.churchName = data.churchName;
    church.status = 1;
    church.created_by = 1;
    church.updated_by = 1;
    try {
      const data = await church.save();
      return this.response.postResponse(data.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async updateChurch(id: number, data: ChurchDto) {
    //check if a church exist
    const church = await Church.findOne({
      where: { status: Not(8), id: id },
    });
    if (!church)
      throw new BadRequestException(`Church with ID ${id} not found`);

    church.churchName = data.churchName;
    church.created_by = 1;
    church.updated_by = 1;
    try {
      const data = await Church.update(id, church);
      return this.response.postResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async getAllChurch() {
    return Church.find({
      where: { status: Not(8) },
    });
  }

  async getSingleChurch(id: number): Promise<Church> {
    //check if a church exist
    const church = await Church.findOne({
      where: { status: Not(8), id: id },
    });
    if (!church)
      throw new BadRequestException(`Church with ID ${id} not found`);
    return church;
  }

  async deleteChurch(id: number) {
    //check if a user exist
    const church = await Church.findOne({
      where: { status: Not(8), id: id },
    });
    if (!church)
      throw new BadRequestException(`Church with ID ${id} not found`);
    try {
      church.status = 8;
      await Church.update(church.id, church);
      return this.response.deleteResponse(church.id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
}
