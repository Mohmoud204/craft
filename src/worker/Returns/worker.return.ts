import { Field, Int, ObjectType } from '@nestjs/graphql';

ObjectType()
class return_imgs {
  @Field(() => String)
  avatar: String
  @Field(() => String)
  img_id: String
}


ObjectType()
class return_imgs_work {
  @Field(() => String)
  work_img: String
  @Field(() => String)
  img_id: String
}


ObjectType()
export class returnWorker {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  craft: string;

  @Field(() => return_imgs)
  profile_img: { img_url: string, img_id: string }

  @Field(() => [return_imgs_work])
  work_imgs: { work_img: string, img_id: string }[];
  
  @Field(()=> Boolean)
  isActive: boolean;
}