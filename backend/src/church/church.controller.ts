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
import { ChurchService } from "./church.service";
import { ChurchDto } from "./church.dto";

@Controller("church")
@ApiTags("church")
export class ChurchController {
  constructor(
    private churchService: ChurchService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}
  @HasRoles("admin")
  @Post("creation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createChurch(@Body() data: ChurchDto, @Request() req) {
    return this.churchService.createChurch(data);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  getSingleChurch(@Param("id") id: number, @Request() req) {
    console.log();
    return this.churchService.getSingleChurch(id);
  }

  @ApiBearerAuth()
  @Get("")
  getAllChurch() {
    return this.churchService.getAllChurch();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateCategory(
    @Param("id") id: number,
    @Body() data: ChurchDto,
    @Request() req,
  ) {
    return this.churchService.updateChurch(id, data);
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteCategory(@Param("id") id: number, @Request() req) {
    return this.churchService.deleteChurch(id);
  }
}
