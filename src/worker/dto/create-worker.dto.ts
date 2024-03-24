import {
  IsNotEmpty, IsString, IsEmail, IsBoolean, MinLength,
  MaxLength, IsMobilePhone, IsOptional, Length, Matches, IsEnum, IsMongoId, IsUrl
} from 'class-validator';


export class img {
  @IsUrl()
  avatar: string
  img_id: string
}
export class img_worker {
  @IsUrl()
  work_img: string
  img_id: string

}

export class CreateWorkerDto {
  /*********** userName ************/
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(15, { message: 'Username cannot be longer than 15 characters' })
  @Matches(/^[^<>]*$/, { message: 'Username must not contain < or >' })
  readonly username: string;


  /*********** email ************/
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[^<>]*$/, { message: 'email must not contain < or >' })
  readonly email: string;

  /*********** address ************/
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
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^<>]*[A-Za-z\d@$!%*?&]{8,}$/i, {
    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  readonly password: string;

  /*********** phone mobile ************/
  @IsMobilePhone(
    'ar-EG',
    {},
    { message: 'The phone number must be Egypt and correctly' },
  )
  @Length(11, 11)

  phone: string;
  @IsOptional()
  /*********** profile_picture ************/
  @IsString({ message: 'Profile picture must be a string' })
  readonly profile_img: img

  @IsOptional()
  /*********** work_pictures ************/
  readonly work_imgs: img_worker[];


  /*********** Active ************/
  @IsOptional()
  active: boolean;

  @IsOptional()
  @IsEnum(["admin", "no"])
  role: string;

  @IsMongoId()
   @IsNotEmpty({ message: 'craft_id is required' })
  craft_id: string;
}