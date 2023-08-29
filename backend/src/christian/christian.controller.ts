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
import { User } from "../user/user/entity/user.entity";
import { ChristianService } from "./christian.service";
import { ChristianRegisterDto } from "./christian";

@Controller("christian")
@ApiTags("christian")
export class ChristianController {
  constructor(
    private christianService: ChristianService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}
  @HasRoles("admin")
  @Post("creation")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createChristian(@Body() data: ChristianRegisterDto, @Request() req) {
    return this.christianService.createChristian(data);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  getSingleChristian(@Param("id") id: number, @Request() req) {
    console.log();
    return this.christianService.getSingleChristian(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("")
  async getSingleAllChristian(@Request() req) {
    const user = await User.findOne({
      where: { id: req.user.userId },
    });
    if (!user)
      throw new BadRequestException(`This user ${req.user.userId} not found`);
    if (user.access_level == "churchelder") {
      return this.christianService.getAllChristianByChruchElder(
        req.user.userId,
      );
    } else {
      return this.christianService.getAllchristians();
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id/:isDateChange")
  updateVictim(
    @Param("id") id: number,
    @Param("isDateChange") isDateChange: string,
    @Body() data: ChristianRegisterDto,
    @Request() req,
  ) {
    return this.christianService.updateChristian(id, data, isDateChange);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteVictim(@Param("id") id: number, @Request() req) {
    return this.christianService.deletechristian(id);
  }
}
