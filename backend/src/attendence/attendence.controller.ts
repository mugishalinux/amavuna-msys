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
import { User } from "../user/user/entity/user.entity";
import { AttendenceRegistrationDto } from "./attendence.dto";
import { Attendence } from "./attendence.entity";
import { Christian } from "../christian/entity/christian.entity";


@Controller("attendence")
@ApiTags("attendence")
export class AttendenceController {
    constructor(
        private authService: AuthService,
        private filter: FilterHelper,
        private jwtService: JwtService,
    ) { }
    @HasRoles("admin")
    @Post("/creation")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createPresentAttendence(@Body() data: AttendenceRegistrationDto, @Request() req) {
        const christian = await Christian.findOne({
            where: { id: data.christian },
        });
        if (!christian)
            throw new BadRequestException(`This christian ${data.christian} not found`);
        const att = new Attendence();
        // Create a new Date object for the current date and time
        const currentDate = new Date();

        // Set the time portion to midnight (00:00:00)
        currentDate.setHours(0, 0, 0, 0);

        // Now you can save the currentDate in your database
        att.attendenceDate = currentDate;





        att.status = data.status;
        att.christian = christian;
        await att.save();
        return {
            HttpStatus: 201,
            message: "Attendence Successfully done"
        }
    }
    @HasRoles("admin")
    @Post("/absence/creation")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createAbsenceAttendence(@Body() data: AttendenceRegistrationDto, @Request() req) {
        const christian = await Christian.findOne({
            where: { id: data.christian },
        });
        if (!christian)
            throw new BadRequestException(`This christian ${data.christian} not found`);
        const att = new Attendence();
        const currentDate = new Date();

        // Set the time portion to midnight (00:00:00)
        currentDate.setHours(0, 0, 0, 0);

        // Now you can save the currentDate in your database
        att.attendenceDate = currentDate;
        console.log(currentDate)

        att.status = data.status;
        att.christian = christian;
        await att.save();
        return {
            HttpStatus: 201,
            message: "Attendence Successfully done"
        }
    }
    @HasRoles("admin")
    @Post("/report/:specificDate")
    @ApiBearerAuth()
    async getReportAllAttendences(@Param("specificDate") specificDate: Date) {
        
        const data = await Attendence.find({
            where: {
                attendenceDate: specificDate
            }
            , relations: ["christian"]
        })
        return data;
    }
}
