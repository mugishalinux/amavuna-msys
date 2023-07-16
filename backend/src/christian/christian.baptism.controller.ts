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
import { CategoryUpateDto } from "./update.dto";
import { ChristianService } from "./christian.service";

@Controller("christianBaptima")
@ApiTags("christianBaptima")
export class ChristianBaptismController {
  constructor(
    private christianService: ChristianService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("allow/:id")
  allowChristianBaptism(@Param("id") id: number, @Request() req) {
    return this.christianService.allowChristianBaptism(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("disallow/:id")
  disAllowChristianBaptism(@Param("id") id: number, @Request() req) {
    return this.christianService.disAllowChristianBaptism(id);
  }
}
