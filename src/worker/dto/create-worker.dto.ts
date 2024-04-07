import {
  IsNotEmpty, IsString, IsEmail, IsBoolean, MinLength,
  MaxLength, IsMobilePhone, IsOptional, Length, Matches, IsEnum, IsMongoId, IsUrl
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class img {
  @ApiProperty()
  @IsUrl()
  avatar: string
  img_id: string
}
export class imgWorker {
  @ApiProperty()
  @IsUrl()
  work_img: string
  img_id: string
}

export class CreateWorkerDto {
  /*********** userName ************/
  @ApiProperty()
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(15, { message: 'Username cannot be longer than 15 characters' })
  @Matches(/^[^<>]*$/, { message: 'Username must not contain < or >' })
  readonly username: string;


  /*********** email ************/
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[^<>]*$/, { message: 'email must not contain < or >' })
  readonly email: string;

  /*********** address ************/
  @ApiProperty()
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Matches(/^[^<>]*$/, { message: 'address must not contain < or >' })
  readonly address: string;
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Matches(/^[^<>]*$/, { message: 'address must not contain < or >' })
  @MinLength(50, { message: 'the password very short' })
  @MaxLength(100, { message: 'the password very long' })
  readonly description: string;

  /*********** password ************/
  /*
  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^<>]*[A-Za-z\d@$!%*?&]{8,}$/i, {
    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  */
  readonly password: string;

  /*********** phone mobile ************/
  @ApiProperty()
  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)

  phone: string;
  @IsOptional()
  /*********** profile_picture ************/
  @ApiProperty()
  @IsString({ message: 'Profile picture must be a string' })
  readonly profile_img: img

  @IsOptional()
  @ApiProperty()
  readonly Worker_img: imgWorker
  /*********** Active ************/
  @ApiProperty()
  @IsOptional()
  active: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(["admin", "user"])
  role: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty({ message: 'craft_id is required' })
  craft_id: string;
}
