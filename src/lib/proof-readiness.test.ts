import assert from "node:assert/strict";
import test from "node:test";

import { buildProofReadinessReport } from "./proof-readiness";
import { withEnv } from "../test/helpers";

const testPrivateKey =
  "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const registryAddress = "0xe69755e4249c4978c39fbe847ca9674ce7af3505";

function buildClient() {
  return {
    async getBalance() {
      return 1_000_000_000_000_000_000n;
    },
    async getBlockNumber() {
      return 95522250n;
    },
    async getChainId() {
      return 5000;
    },
    async readContract({ functionName }: { functionName: string }) {
      if (functionName === "nextDecisionId") {
        return 2n;
      }

      return {
        agentId: 94n,
        createdAt: 1_780_000_000n,
        decisionHash:
          "0x1111111111111111111111111111111111111111111111111111111111111111",
        evidenceUri: "langclaw://evidence/run/hash",
        recorder: "0x2cA915EF6be8D2D48ccD3c5dAF715546AF873A4c",
        runId: "run-1",
        signalType: "smart-money",
      };
    },
  };
}

const readyEnv = {
  MANTLE_AGENT_PRIVATE_KEY: testPrivateKey,
  MANTLE_CHAIN_ENABLED: "true",
  MANTLE_CHAIN_ID: "5000",
  MANTLE_CHAIN_RPC_URL: "https://rpc.mantle.test",
  MANTLE_ERC8004_AGENT_ID: "94",
  MANTLE_INTEL_PROOF_ENABLED: "true",
  MANTLE_LANGCLAW_REGISTRY_ADDRESS: registryAddress,
};

test("proof readiness passes when Mantle proof env and registry are usable", async () => {
  await withEnv(readyEnv, async () => {
    const report = await buildProofReadinessReport({
      publicClient: buildClient(),
    });

    assert.equal(report.ready, true);
    assert.equal(report.status, "ready");
    assert.equal(report.chain, "mantle");
    assert.equal(report.latestDecision?.agentId, "94");
    assert.ok(report.checks.every((check) => check.status === "pass"));
  });
});

test("proof readiness fails when the recorder key is missing", async () => {
  await withEnv(
    {
      ...readyEnv,
      MANTLE_AGENT_PRIVATE_KEY: undefined,
      MANTLE_PRIVATE_KEY: undefined,
    },
    async () => {
      const report = await buildProofReadinessReport({
        publicClient: buildClient(),
      });

      assert.equal(report.ready, false);
      assert.equal(report.status, "not_ready");
      assert.equal(
        report.checks.find((check) => check.id === "agent-private-key")?.status,
        "fail"
      );
    }
  );
});

test("proof readiness warns when direct on-chain tool proof is disabled", async () => {
  await withEnv(
    {
      ...readyEnv,
      MANTLE_INTEL_PROOF_ENABLED: "false",
    },
    async () => {
      const report = await buildProofReadinessReport({
        publicClient: buildClient(),
      });

      assert.equal(report.ready, true);
      assert.equal(report.status, "warning");
      assert.equal(
        report.checks.find((check) => check.id === "onchain-tool-proof-enabled")?.status,
        "warn"
      );
    }
  );
});
