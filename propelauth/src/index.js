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

        var authorization = request.headers.get("authorization");
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
