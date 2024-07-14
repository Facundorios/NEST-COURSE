import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRawHeaders = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const headers = request.rawHeaders;
    return { Headers: headers };
    //return !data ? headers : headers[data];
  },
);
