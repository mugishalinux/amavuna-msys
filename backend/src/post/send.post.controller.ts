import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
  HttpException,
  HttpStatus,
  ConsoleLogger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth/auth.service";
import { FilterHelper } from "../helpers/filter.helper";
import { Not } from "typeorm";

import { HasRoles } from "../auth/has-roles.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { PostService } from "./post.service";
import { PostDto } from "./post.dto";
import { SendPostService } from "./send.post";
import { SendPostDto } from "./send.post.dto";

@Controller("send-post")
@ApiTags("send-post")
export class SendPostController {
  constructor(
    private sendPostService: SendPostService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}
  @HasRoles("admin")
  @Get("creation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sendPost(@Body() data: SendPostDto, @Request() req) {
    console.log("hitted")
    // return this.sendPostService.getSendPost(data);
  }
}
