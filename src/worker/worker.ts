import { v2 as cloudinary } from 'cloudinary';
export const WorkerProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: "dszfsl3tv",
      api_key: "651567585754222",
      api_secret: "8zMOw4RNcFqcnY75OOx1bBsiZAU",
    });
  },
};
