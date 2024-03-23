import { Resolver, Query,Args , Mutation,ID} from '@nestjs/graphql';
import { CrastsService } from './crasts.service';
import { Craft_Return } from "./Returns/crafts.retutn"
import { Crafts } from "./Database/Crafts.db"
import { Craft_input } from "./Inputs/Crafts.input"
@Resolver('Crast')
export class CrastsResolver {
  constructor(private readonly crastsService: CrastsService) { }
  @Query(() => [Craft_Return])
  async findAll(): Promise<Craft_Return[]> {
    return await this.crastsService.findAllUser()
  }
  @Query(() => Craft_Return)
  async findById(@Args({ name: 'craftId', type: () => ID }) craftId:string): Promise<Craft_Return> {
    return await this.crastsService.findById(craftId)
  }

  @Mutation(() => Craft_Return)
  async addCraft(@Args("input") input:Craft_input): Promise<Craft_Return> {
    return await this.crastsService.addCraft(input)
  }

}