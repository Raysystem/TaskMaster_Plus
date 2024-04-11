import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthorizationLoginPayload } from "src/utis/base-64-converter";
export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers
        const loginPayload = AuthorizationLoginPayload(authorization)
        return loginPayload?.id
    }
)