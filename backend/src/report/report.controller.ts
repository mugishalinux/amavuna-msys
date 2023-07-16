import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { Not } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Christian } from "../christian/entity/christian.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

export type Usa = any;
@Controller("report")
@ApiTags("report")
export class ChristianReportController {
  constructor() {}
  @ApiBearerAuth()
  @Get("")
  async countBoat(id: number) {
    return Christian.query(`SELECT
	months.name AS name,
	IFNULL(c.Total, 0) AS Total
FROM (
	SELECT
		0 AS month_num,
		DATE_FORMAT(CURRENT_DATE, '%M') AS name
	UNION ALL
	SELECT
		1 AS month_num,
		DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH), '%M') AS name
	UNION ALL
	SELECT
		2 AS month_num,
		DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH), '%M') AS name
	UNION ALL
	SELECT
		3 AS month_num,
		DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH), '%M') AS name
	UNION ALL
	SELECT
		4 AS month_num,
		DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH), '%M') AS name
	UNION ALL
	SELECT
		5 AS month_num,
		DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH), '%M') AS name) AS months
	LEFT JOIN (
		SELECT
			DATE_FORMAT(created_at, '%M') AS month_name,
			COUNT(*) AS Total
		FROM
			christian
		WHERE
			created_at >= DATE_SUB(LAST_DAY(CURRENT_DATE), INTERVAL 5 MONTH) + INTERVAL 1 DAY
		GROUP BY
			month_name) AS c ON months.name = c.month_name
	ORDER BY
		months.month_num DESC;
`);
  }
  @ApiBearerAuth()
  @Get("/christian/registered/today")
  async countTodayChristianRegesterd() {
    return Christian.query(`SELECT
      COUNT(*) AS total_records_created_today
  FROM
      christian
  WHERE
      DATE(created_at) = CURDATE();
  `);
  }
}
