import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { SexEnum } from '~/constants/enum'
import ApiProperty from '~/decorator/controllerDecorator/apiProperties.decorator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(String)
  public firstName!: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(String)
  public lastName!: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(String)
  public password!: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty(String)
  public email!: string

  @IsEnum(SexEnum)
  @IsOptional()
  @ApiProperty(SexEnum)
  public sex!: SexEnum
}
