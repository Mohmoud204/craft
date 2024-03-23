import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Craft_Return {
  @Field(() => String)
  _id: String

  @Field(() => String)
  craft: String;
}