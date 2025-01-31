export class EnvMock {
  public static handler(
    input: Record<string, string | undefined> = {}
  ): Record<string, string | undefined> {
    const envs: Record<string, string | undefined> = {
      NODE_ENV: 'test',
      AWS_ENDPOINT: 'http://localhost:5566',
      AWS_REGION: 'us-east-1',
      DB_APP_NAME: 'nfs-credit-decision-loanmanament',
      DB_APP_PASS: 'root',
      DB_APP_USER: 'root',
      DB_APP_USER_MIGRATION: 'root',
      DB_APP_PASS_MIGRATION: 'root',
      DB_DNS: 'http://localhost',
      DB_RO_DNS: 'http://localhost',
      DB_APP_PORT: '3306',
      ...input, 
    };

    Object.assign(process.env, envs);

    return envs;
  }

  public static reset() {
    jest.restoreAllMocks(); 
    process.env = {};
  }
}
