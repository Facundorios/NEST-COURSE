export const  DefaultEnvironmentsValues = () => ({
    environment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 4000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 25
})