import { num } from '@/helpers/num';
import {
  Box,
  Card, HStack, Text
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import useMintState from './hooks/useMintState';
import { TxButton } from '../TxButton';

type SummaryItemProps = {
  label: string
  value: string
  usdValue: string
}

const SummaryItem = ({ label, value, usdValue }: SummaryItemProps) => (
  <HStack
    key={label}
    justifyContent="space-between"
    pb="1"
    my="2"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
  >
    <Text variant="value" textTransform="unset">
      {label}
    </Text>
    <HStack>
      <Text>{value}</Text>
      <Text color="primary.200">${usdValue}</Text>
    </HStack>
  </HStack>
)

export const Summary = () => {
  const { mintState } = useMintState();

  const parseData = useMemo(() => {
    const filderZero = mintState?.assets?.filter((a) => num(a.sliderValue).isGreaterThan(0));
    return filderZero?.map((a) => {
      return {
        label: a.symbol,
        value: num(a.sliderValue)
          .times(a.comboUsdValue)
          .dividedBy(100)
          .dividedBy(a.price)
          .toFixed(6),
        usdValue: num(a.sliderValue).times(a.comboUsdValue).dividedBy(100).toFixed(2),
      };
    });
  }, [mintState]);

  const totalUsdValue = useMemo(() => {
    return parseData?.reduce((acc, a) => {
      return acc + num(a.usdValue).toNumber();
    }, 0);
  }, [parseData]);

  return (
    <Card h="max-content" overflow="auto" w="400px">
      <Text variant="title" fontSize="24px">
        Summary
      </Text>

      {parseData?.map(({ label, value, usdValue }) => {
        return <SummaryItem key={label} label={label} value={value} usdValue={usdValue} />;
      })}

      <SummaryItem label="Total" value="" usdValue={totalUsdValue?.toFixed(2) || '0'} />

      <Box mt="5" w="auto" alignSelf="center">
        <TxButton>Mint</TxButton>
      </Box>
    </Card>
  );
};
