import {handleError, initAuth} from '@propelauth/cloudflare-worker'

export default
{
	async fetch(request, env, ctx)
    {
        const {updateUserMetadata, fetchUserMetadataByUserId, validateAuthHeaderAndGetUser} = initAuth(
        {
          authUrl: "https://auth.reportbase.com",
          apiKey: "a6f6febc0262664f94525607402a8e841063aefb2a0e0e7892b004ca45e19c64400a2c8814ae3adba094a385c5e1c7b0",
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

//        var authorization = request.headers.get("authorization");
        var authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODM5MzI1NzQsImV4cCI6MTY4MzkzNDM3NCwidXNlcl9pZCI6Ijg0Zjg5ODg1LTE4MGUtNDc5ZS04OTZkLWFmZTAwMzgzODJjZCIsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXBvcnRiYXNlLmNvbSIsImVtYWlsIjoicmVwb3J0YmFzZUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiVG9tIiwibGFzdF9uYW1lIjoiQnJpbmttYW4iLCJ1c2VybmFtZSI6InJlcG9ydGJhc2UiLCJvcmdfaWRfdG9fb3JnX21lbWJlcl9pbmZvIjp7IjA1NDU4ZWI1LTJmNWYtNGU4NS05YjkwLWJjOGVhM2MyYmMzNCI6eyJvcmdfaWQiOiIwNTQ1OGViNS0yZjVmLTRlODUtOWI5MC1iYzhlYTNjMmJjMzQiLCJvcmdfbmFtZSI6InJlcG9ydGJhc2UiLCJ1cmxfc2FmZV9vcmdfbmFtZSI6InJlcG9ydGJhc2UiLCJvcmdfbWV0YWRhdGEiOnt9LCJ1c2VyX3JvbGUiOiJPd25lciIsImluaGVyaXRlZF91c2VyX3JvbGVzX3BsdXNfY3VycmVudF9yb2xlIjpbIk93bmVyIiwiQWRtaW4iLCJNZW1iZXIiXSwidXNlcl9wZXJtaXNzaW9ucyI6WyJwcm9wZWxhdXRoOjpjYW5faW52aXRlIiwicHJvcGVsYXV0aDo6Y2FuX2NoYW5nZV9yb2xlcyIsInByb3BlbGF1dGg6OmNhbl9yZW1vdmVfdXNlcnMiXX19fQ.r8QFaYre-u-J5p55rq2XEYs9BVVDOVjGTCUahe8B6YSBan7gXdK2Gqobyp5bx9MK_nMqPABcxvG_mU2GcZGVzg5Bk6OiTlxLk4E3CiccToQADEypaFHqqBJiNEIQO82f42XsXdaq4muKydNaVoPsW0svy8g6tBykqu5x89p6yCtubmaFVZjERG1Ei5vXCjG2606LaIGpngxD2Bot43toHNu9na5S9HS9GAajuR_BoynS0MepP3xd23O6_5YazYN8VGGrs4kityZE5eHfbcG0Yds5B4TTQXyOpFvPAkcRBEDTYUcPC_Z4_givkYsO-Ro3kMxc4MnNwhbN_3opKCP-MA"
        let user = await validateAuthHeaderAndGetUser(authorization)
        await updateUserMetadata(user.userId,
        {
            metadata:
            {
                "user_testing_group": "A",
            }
        })

        const meta = await fetchUserMetadataByUserId(user.userId)
        let headers = new Headers(
        {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
	    });
        return new Response(JSON.stringify(meta), { headers });
	},
};
