import {handleError, initAuth} from '@propelauth/cloudflare-worker'

const {validateAuthHeaderAndGetUser} = initAuth(
{
  authUrl: "https://auth.reportbase.com",
  apiKey: "c5f11b81ccc3d9acf594e5f6895fef9f31c35ab3e63c58e90fac31b532d4e46e5c9de81d7cb95613edb13f9131c49bf1",
  verifierKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwt+E+IcOwK+iIUxmy940
ddopF81H2Ci1QbGPi2ijCPF2Ea2ajCmmqCS/15GGqh/5GRPx8QwW/Or+vUG9TVhf
Qp7Fq/hbWhdbXp7x69KAO8qNBaH0NnuvrkXQsXjiQZeIKKUNik+2f5zkygnbYMOi
NTTK2A5t+NmrUBjzXp9icyEqPCpVfc3z0cql5MR0ZwEHHV1TdHGcEFTn7YngGfbm
565N87ULIlZ9De6TEIpyIuqonZ0Q7L7kYmVf+Oe11i50y900lPwMSlM5u1TNCXFL
qpBU/MhM9CXMwH+i7Nrcszpm+uAyIBfwHM92kM25qUZGY3up7YN70jJLTL/COyVw
1QIDAQAB
-----END PUBLIC KEY-----`
});

export default 
{
	async fetch(request, env, ctx) 
    {
        //https://auth.reportbase.com/api/v1/refresh_token
        //access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzUxMzE4ODksImV4cCI6MTY3NTEzMzY4OSwidXNlcl9pZCI6Ijg0Zjg5ODg1LTE4MGUtNDc5ZS04OTZkLWFmZTAwMzgzODJjZCIsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXBvcnRiYXNlLmNvbSIsIm9yZ19pZF90b19vcmdfbWVtYmVyX2luZm8iOnt9fQ.osplKhm8ApIs6HrQfRB8vI3ryvEEVPEx23AyvWtYUQX3pRDtX3SmNOgrGCoMdiajjcPrtct8yFze-vxhbemv4bYjXyTwJykD2fBWT6POMWyB7JHTweO-nOXJMnvtaV4L8XBGVIb8yTuAiHBSQyDQkFA9A_hrNlxJ8lQv4V_1z19tLndKK-VVuxQPw15guC6kL56d9nzJfHACQzJ5ybcHt1Gfv44CBxBWlgDEDsfxDojGJPZ8_iapRfNbHxqQ82e5fd6xLL86I3F0XjTmEiqH2DXdxsX6SiXxZSqe3-sr3iMPnCzDqm91h7LLV3kKFpMwcmhg4TvrtYD0yJFr3-bAYA
       
        try 
        {
            const authHeader = request.headers.get("authorization")
            const user = await validateAuthHeaderAndGetUser(authHeader)
            return Response.json(user)
        } 
        catch (e) 
        {
            const error = handleError(e, {logError: true, returnDetailedErrorToUser: true})
            return new Response(error.message, {status: error.status})
        }
	},
};

