const accountId = context.accountId;

const daoId = "rc-dao.sputnik-dao.near";
const roleId = "voter";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}
const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(accountId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

const handleJoin = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "potential member",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 85px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 8px;
  max-width: 700px;

  span {
    display: inline-block;
    background: #62C6F2;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;
    max-width: 500px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 50px;
    max-width: 333px;

    span {
      border-radius: 10px;
      svg {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 14px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? "row"};
  flex-wrap: ${(p) => p.wrap ?? "nowrap"};
`;

const Container = styled.div`
  display: flex;
  max-width: 888px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;

  @media (max-width: 480px) {
    max-width: 333px;
  }
`;

const Proposals = styled.div`
  max-width: 555px;

  @media (max-width: 480px) {
    max-width: 380px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  max-width: 555px;
`;

return (
  <Container center>
    <Flex gap="23px" direction="column" alignItems="center">
      <H1>
        Regional Communities
        <span>
          DAO{" "}
          <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
            <path
              d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
              fill="#4D63EC"
            />
          </svg>
        </span>
      </H1>

      <Text size="29px" weight="600">
        NEAR Ecosystem Governance
      </Text>

      {!accountId && (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
            size: "large",
          }}
        />
      )}

      {(accountId && (
        <div>
          <div className="mb-5">
            <Widget
              src="hack.near/widget/communities.join"
              props={{
                memberId: accountId,
                roleId,
              }}
            />
          </div>
          <ButtonContainer>
            <h5>Select Your Home Continent:</h5>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "africa-community.sputnik-dao.near",
                  name: "Africa",
                  memberId: accountId,
                  roleId,
                }}
              />
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "asia.sputnik-dao.near",
                  name: "Asia",
                  memberId: accountId,
                  roleId,
                }}
              />
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "australia.sputnik-dao.near",
                  name: "Australia",
                  memberId: accountId,
                  roleId,
                }}
              />
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "europe.sputnik-dao.near",
                  name: "Europe",
                  memberId: accountId,
                  roleId,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "north-america.sputnik-dao.near",
                  name: "North America",
                  memberId: accountId,
                  roleId,
                }}
              />
              <Widget
                src="hack.near/widget/communities.regional"
                props={{
                  daoId: "south-america.sputnik-dao.near",
                  name: "South America",
                  memberId: accountId,
                  roleId,
                }}
              />
            </div>
          </ButtonContainer>
          <Proposals>
            <Widget
              src="hack.near/widget/dao.proposals"
              props={{ daoId, accountId, limit: 5 }}
            />
          </Proposals>
        </div>
      )) || (
        <div className="row">
          <div className="col-6 mt-5">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://i-am-human.app/?community=banyan&vertical=regionalcommunities",
                label: "Get Verified",
                variant: "outline-primary",
                size: "large",
              }}
            />
          </div>
          <div className="col-6">
            <Widget src="hack.near/widget/gov.Badge" />
          </div>
        </div>
      )}
    </Flex>
    <hr />
    <Text
      size="14px"
      weight="600"
      style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
    >
      Made Possible by{" "}
      <a href="https://near.org/blog/near-digital-collective-legal-framework/">
        NDC
      </a>
      <Widget src="hack.near/widget/dev.Badge" />
    </Text>
  </Container>
);
