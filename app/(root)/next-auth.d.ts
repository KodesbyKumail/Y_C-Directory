declare module "next-auth"
{
    interface session{
        id?: string;
        githubId?: number;
        username?: string;
        user?: {
            name?: string;
            email?: string;
            image?: string;
        };
    }

    interface JWT{
        id?: string;
        githubId?: number;
        username?: string;
        email?: string;
        name?: string;
        picture?: string;
        sub?: string;
    }
}