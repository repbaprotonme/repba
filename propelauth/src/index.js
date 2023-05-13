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
    async function getbody(response)
        {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      } else if (contentType.includes("application/text")) {
        return response.text();
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.text();
      }
    }

        var body = await getbody(request);
        body = JSON.parse(body);
        let user = await validateAuthHeaderAndGetUser(`Bearer ${body.accessToken}`)
        var success = await updateUserMetadata(user.userId, {c:3});
        var meta = await fetchUserMetadataByUserId(user.userId)

        let headers = new Headers(
        {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
	    });

        return new Response(JSON.stringify(meta), { headers });
	},
};
