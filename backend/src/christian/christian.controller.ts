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
  @Put(":id")
  updateVictim(
    @Param("id") id: number,
    @Body() data: ChristianRegisterDto,
    @Request() req,
  ) {
    // const months = {
    //   January: "01",
    //   February: "02",
    //   March: "03",
    //   April: "04",
    //   May: "05",
    //   June: "06",
    //   July: "07",
    //   August: "08",
    //   September: "09",
    //   October: "10",
    //   November: "11",
    //   December: "12",
    // };

    // const years = data.dob.getFullYear();
    // const mon = String(data.dob.getMonth() + 1).padStart(2, "0");
    // const days = String(data.dob.getDate()).padStart(2, "0");
    // const dateFormat = `${years}-${mon}-${days}`;

    // const dateParts = dateFormat.split(" ");
    // const day = dateParts[0];
    // const month = months[dateParts[1]];
    // const year = dateParts[2];

    // console.log(`${year}-${month}-${day}`);

    return this.christianService.updateChristian(id, data);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  deleteVictim(@Param("id") id: number, @Request() req) {
    return this.christianService.deletechristian(id);
  }
}
