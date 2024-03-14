import * as bcrypt from 'bcrypt';

export class CommonService {
  async hashPassword(password: string, salt: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      throw new Error(err);
    }
  }

  async generateSalt(numberOfIterations: number): Promise<string> {
    try {
      const salt = await bcrypt.genSaltSync(numberOfIterations);
      return salt;
    } catch (err) {
      throw new Error(err);
    }
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (err) {
      throw new Error(err);
    }
  }
}
