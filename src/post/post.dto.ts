import {
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator'

class CreatePostDto {
  @IsString({
    message: 'Title must be a string value'
  })
  @IsNotEmpty({
    message: 'Title must not be empty.'
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters.'
  })
  title: string

  @IsString({
    message: 'Body must be a string value'
  })
  @IsNotEmpty({
    message: 'Body must not be empty.'
  })
  @MinLength(10, {
    message: 'Body must be at least 10 characters.'
  })
  body: string

  @IsString({
    message: 'Summary must be a string value'
  })
  @IsNotEmpty({
    message: 'Summary must not be empty.'
  })
  @MinLength(5, {
    message: 'Summary must be at least 5 characters.'
  })
  summary: string

  @ArrayMinSize(1, {
    message: 'At least one tag is required'
  })
  @IsString({
    each: true,
    message: 'Tag must be a string value'
  })
  @MinLength(3, {
    each: true,
    message: 'Tag must be at least 3 characters.'
  })
  tags: string[]
}

export default CreatePostDto
