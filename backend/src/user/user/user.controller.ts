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
  ForbiddenException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "./dto/login.dto";
import { UserDto } from "./dto/userDto";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "../../auth/local-auth.guard";
import { AuthService } from "../../auth/auth.service";
import { Not } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ResetPassword } from "./dto/reset-password.dto";
import { HasRoles } from "../../auth/has-roles.decorator";
import { RolesGuard } from "../../auth/roles.guard";
import { Role } from "./enums/role";
import { FilterHelper } from "../../helpers/filter.helper";
import { SubscriberDto } from "./dto/subscriber.dto";
import { RegisterDto } from "./dto/register.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ForgetPasswordDto } from "./dto/forget.password";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private filter: FilterHelper,
    private jwtService: JwtService,
  ) {}

  @Post("createMentor")
  @ApiBearerAuth()
  async createChurchElder(@Body() userDto: RegisterDto) {
    userDto.access_level = "churchelder";

    return this.userService.createUsers(userDto);
  }
  @Post("createAdmin")
  @ApiBearerAuth()
  async createAdmin(@Body() userDto: RegisterDto) {
    userDto.access_level = "admin";
    return this.userService.createUsers(userDto);
  }

  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Put("updateUserInfo/:id")
  @ApiBearerAuth()
  async updateUserInfo(
    @Param("id") id: number,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.upadateUserInfo(id, userDto);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Put("activateMentorAccount/:id")
  @ApiBearerAuth()
  async activateChurchElder(@Request() req, @Param("id") id: number) {
    const user = await User.findOne({
      where: { id: req.user.userId },
    });

    try {
      if (user.access_level == "churchelder") {
        console.log(user);
        throw new ForbiddenException("You are not allowed activate account");
      }
    } catch (e) {
      console.log(e);
    }
    return this.userService.approveSkipperAccount(id);
  }
  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Put("disableMentorAccount/:id")
  @ApiBearerAuth()
  async disableChurchElder(@Request() req, @Param("id") id: number) {
    const user = await User.findOne({
      where: { id: req.user.userId },
    });
    if (user.access_level == "churchelder") {
      console.log(user);
      throw new ForbiddenException("You are not allowed activate account");
    }
    return this.userService.disableSkipperAccount(id);
  }

  @Post("updatingPassword/id/:id/password/:password")
  @ApiBearerAuth()
  async updatePassword(
    @Param("id") id: number,
    @Param("password") password: string,
  ) {
    return this.userService.updatingPassword(id, password);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Get("/getAllMentor")
  async getAllChurchElder(@Request() req) {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getSingleUserById(@Param("id") id: number): Promise<User> {
    return this.userService.getSingleUser(id);
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Get("")
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @HasRoles("admin")
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
  @Post("forget/password")
  @ApiBearerAuth()
  async forgetPassword(@Body() userData: ForgetPasswordDto) {
    return this.userService.forgetPassword(userData);
  }

  @ApiBearerAuth()
  @Post("auth/login/user")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.phone,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const data = await User.findOne({ where: { id: user.id } });
    const payload = { id: user.id, names: user.names };
    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    const userInfo = await User.findOne({
      where: { id: user.id },
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: user.id,
          status: userInfo.status,
          names: user.firstName + " " + user.lastName,
          access_level: user.access_level,
          jwtToken,
        });
      }, 0); // Delay the response by 3 seconds
    });
  }
}
