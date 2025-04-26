import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TransactionCard = ({ transaction }: { transaction: any }) => {
  console.log("Transaction data:", transaction);
  const tx = transaction;

  return (
    <div className="space-y-4 p-4 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div>
        <h4 className="font-semibold">Transaction Hash</h4>
        <p className="font-mono text-xs break-all">{tx.tx_hash}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Status</h4>
          <Badge
            variant={tx.tx_status === "finalized" ? "success" : "destructive"}
          >
            {tx.tx_status}
          </Badge>
        </div>

        <div>
          <h4 className="font-semibold">Block Time</h4>
          <p>{new Date(tx.block_time * 1000).toLocaleString()}</p>
        </div>

        <div>
          <h4 className="font-semibold">Block ID</h4>
          <p>{tx.block_id}</p>
        </div>

        <div>
          <h4 className="font-semibold">Fee</h4>
          <p>{tx.fee / 1000000} SOL</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Signer</h4>
        {tx.signer &&
          tx.signer.map((s: string, i: number) => (
            <p key={i} className="font-mono text-xs break-all">
              {s}
            </p>
          ))}
      </div>

      <div>
        <h4 className="font-semibold">
          Instructions ({tx.parsed_instructions?.length || 0})
        </h4>
        <div className="space-y-2 mt-2">
          {tx.parsed_instructions?.map((inst: any, idx: number) => (
            <div
              key={idx}
              className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
            >
              <p>
                <span className="font-semibold">Type:</span> {inst.type}
              </p>
              <p>
                <span className="font-semibold">Program:</span> {inst.program}
              </p>
              <p className="font-mono text-xs break-all">
                <span className="font-semibold">Program ID:</span>{" "}
                {inst.program_id}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Programs Involved</h4>
        <div className="space-y-1">
          {tx.programs_involved?.map((id: string, idx: number) => (
            <p key={idx} className="font-mono text-xs break-all">
              {id}
            </p>
          ))}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sol-balance-changes">
          <AccordionTrigger className="font-semibold">
            SOL Balance Changes ({tx.sol_bal_change?.length || 0})
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {tx.sol_bal_change?.map((change: any, idx: number) => (
                <div
                  key={idx}
                  className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-mono text-xs break-all">
                    <span className="font-semibold">Address:</span>{" "}
                    {change.address}
                  </p>
                  <p>
                    <span className="font-semibold">Pre Balance:</span>{" "}
                    {change.pre_balance / 1000000000} SOL
                  </p>
                  <p>
                    <span className="font-semibold">Post Balance:</span>{" "}
                    {change.post_balance / 1000000000} SOL
                  </p>
                  <p>
                    <span className="font-semibold">Change:</span>{" "}
                    {Number(change.change_amount) / 1000000000} SOL
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TransactionCard;
