import useVaultSummary from './useVaultSummary';

export const useCurrentPosition = () => {
  const summary = useVaultSummary();

  return [
    {
      label: 'DEBT',
      value: `${summary.debtAmount?.toFixed(0)} CDT`,
    },
    {
      label: 'LTV',
      value: `${summary.ltv}%`,
    },
    {
      label: 'COST',
      value: `${summary.cost?.toFixed(4)}%`,
    },
    {
      label: 'BORROWABLE LTV',
      value: `${summary?.borrowLTV}%`,
    },
    {
      label: 'LIQ. VALUE',
      value: `$${summary.liquidValue?.toFixed(2)}`,
    },
    {
      label: 'LIQUIDATION LTV',
      value: `${summary.liqudationLTV?.toFixed(2)}%`,
    },
    {
      label: 'TVL',
      value: `$${summary.tvl?.toFixed(2)}`,
    },
  ];
};
