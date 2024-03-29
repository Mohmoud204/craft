import { Login_dto } from "../dto/login-worker.dto"
export interface Login {
  access_token: string
  refresh_token: string
  login: Login_dto
}