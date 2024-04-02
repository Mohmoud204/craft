// xss.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as xss from 'xss';

@Injectable()
export class XSSMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Sanitize request body
    if (req.body) {
      req.body = this.sanitizeObject(req.body);
    }
    next();
  }

  // Recursively sanitize object properties
  private sanitizeObject(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        obj[key] = xss.filterXSS(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item) => this.sanitizeObject(item));
      } else if (typeof obj[key] === 'object') {
        obj[key] = this.sanitizeObject(obj[key]);
      }
    }
    return obj;
  }
}
