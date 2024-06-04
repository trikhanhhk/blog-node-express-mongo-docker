import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { SexEnum } from '~/constants/enum'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName!: string

  @IsString()
  @IsNotEmpty()
  public lastName!: string

  @IsString()
  @IsNotEmpty()
  public password!: string

  @IsEmail()
  @IsNotEmpty()
  public email!: string

  @IsEnum(SexEnum)
  @IsOptional()
  public sex!: SexEnum
}
