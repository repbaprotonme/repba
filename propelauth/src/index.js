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

