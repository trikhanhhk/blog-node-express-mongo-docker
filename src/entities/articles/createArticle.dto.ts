import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  public author!: string

  @IsString()
  @IsNotEmpty()
  public content!: string

  @IsString()
  @IsNotEmpty()
  public title!: string
}
