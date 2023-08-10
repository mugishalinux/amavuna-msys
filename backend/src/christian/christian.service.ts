import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Not } from "typeorm";
import e from "express";
import { ResponseService } from "../response/response.service";
import { Christian } from "./entity/christian.entity";
import { CategoryUpateDto } from "./update.dto";
import { User } from "../user/user/entity/user.entity";
import { CertificateService } from "../certificates/certificate.service";
import { CertificateRegisterDto } from "../certificates/dto/create.certificate.dto";
import { Category } from "../category/entity/category.entity";
import { ChristianRegisterDto } from "./christian";
export type Usa = any;
@Injectable()
export class ChristianService {
  constructor(
    private response: ResponseService,
    private certificateService: CertificateService,
  ) {}

  async createChristian(data: ChristianRegisterDto) {
    const christian = new Christian();
    christian.firstName = data.firstName;
    christian.lastName = data.lastName;
    christian.dob = data.dob;
    christian.primaryPhone = data.phoneNumber;
    christian.status = 1;
    christian.created_by = 1;
    christian.updated_by = 1;
    // check if user exist
    const user = await User.findOne({
      where: { id: data.user },
    });
    if (!user)
      throw new BadRequestException(`This user ${data.user} not found`);
    christian.user = user;
    // check if user exist

    // Calculate age based on the provided date of birth
    const selectedDate = new Date(data.dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    if (
      currentDate.getMonth() < selectedDate.getMonth() ||
      (currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getDate() < selectedDate.getDate())
    ) {
      age--;
    }

    // Check if age is 12 or younger
    if (age < 12) {
      throw new BadRequestException("Christian must be at least 12 years old.");
    }

    try {
      const data = await christian.save();
      await this.certificateService.createCertificate(data.id);
      return this.response.postResponse(data.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async updateChristian(id: number, data: ChristianRegisterDto) {
    const christian = await Christian.findOne({
      where: { id },
    });
    if (!christian)
      throw new BadRequestException(`This christian ${id} not found`);
    christian.firstName = data.firstName;
    christian.lastName = data.lastName;
    christian.dob = data.dob;
    christian.primaryPhone = data.phoneNumber;
    christian.status = 1;
    christian.created_by = 1;
    christian.updated_by = 1;
    // Calculate age based on the provided date of birth
    const selectedDate = new Date(data.dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - selectedDate.getFullYear();
    if (
      currentDate.getMonth() < selectedDate.getMonth() ||
      (currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getDate() < selectedDate.getDate())
    ) {
      age--;
    }

    // Check if age is 12 or younger
    if (age < 12) {
      throw new BadRequestException("Christian must be at least 12 years old.");
    }
    try {
      const data = await Christian.update(id, christian);
      return this.response.updateResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async getAllchristians() {
    return Christian.find({
      where: { status: Not(8) },
    });
  }
  async getAllChristianByChruchElder(id: number) {
    //generate random christian
    // await this.createRandomChristians();

    return Christian.find({
      where: { status: Not(8), user: { id } },
    });
  }
  async getSingleChristian(id: number) {
    const christian = await Christian.findOne({
      where: { status: Not(8), id: id },
    });
    if (!christian)
      throw new BadRequestException(`This christian ${id} not found`);
    return christian;
  }

  async deletechristian(id: number) {
    const christian = await Christian.findOne({
      where: { status: Not(8), id: id },
    });
    if (!christian)
      throw new BadRequestException(`This christian ${id} not found`);
    try {
      christian.status = 8;
      await Christian.update(id, christian);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async allowChristianBaptism(id: number) {
    const christian = await Christian.findOne({
      where: { status: Not(8), id: id },
    });
    if (!christian)
      throw new BadRequestException(`This christian ${id} not found`);
    try {
      christian.isBaptised = true;
      await Christian.update(id, christian);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }
  async disAllowChristianBaptism(id: number) {
    const christian = await Christian.findOne({
      where: { status: Not(8), id: id },
    });
    if (!christian)
      throw new BadRequestException(`This christian ${id} not found`);
    try {
      christian.isBaptised = false;
      await Christian.update(id, christian);
      return this.response.deleteResponse(id);
    } catch (error) {
      throw new InternalServerErrorException("something wrong : ", error);
    }
  }

  async createRandomChristians() {
    const totalRows = 1500;

    const userIDs = [4, 5, 6, 7, 8, 9, 10]; // IDs of users to select from

    for (let i = 0; i < totalRows; i++) {
      const christian = new Christian();
      christian.firstName = this.getRandomName();
      christian.lastName = this.getRandomName();
      christian.dob = this.getRandomDate("1970-01-01", "2003-12-31");
      christian.primaryPhone = this.getRandomPhoneNumber();
      christian.status = 1;
      christian.created_by = 1;
      christian.updated_by = 1;

      const randomUserID = this.getRandomArrayElement(userIDs);
      const user = await User.findOne({ where: { id: randomUserID } });
      if (!user) {
        throw new Error(`User with ID ${randomUserID} not found`);
      }
      christian.user = user;

      const now = new Date();
      const fiveMonthsAgo = new Date(now.getTime());
      fiveMonthsAgo.setMonth(now.getMonth() - 5);
      const randomCreatedAt = this.getRandomDate(
        fiveMonthsAgo.toISOString(),
        now.toISOString(),
      );
      christian.created_at = randomCreatedAt;

      try {
        await christian.save();
        console.log(christian);
        // await this.certificateService.createCertificate(data.id); // Assuming you have a certificate service
      } catch (error) {
        console.error("Error while creating Christian:", error.message);
      }
    }

    console.log("Random Christians created successfully!");
  }

  getRandomName(): string {
    // Implement your logic to generate random names here (if needed)
    return "Random Name";
  }

  getRandomPhoneNumber(): string {
    // Implement your logic to generate random phone numbers here (if needed)
    return "Random Phone Number";
  }

  getRandomArrayElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomDate(start: string, end: string): Date {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
  }
}
