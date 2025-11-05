import { ViaCepAddressFetcher } from "./via-cep-fetcher";

interface AddressData {
  address: string;
  bairro: string;
  city: string;
  state: string;
}

const defaultFetcher = new ViaCepAddressFetcher();

interface AddressFetcher {
  fetchAddress(zipCode: string): Promise<AddressData | null>;
}

export async function fetchAddressFromCEP(
  zipCode: string,
  fetcher: AddressFetcher = defaultFetcher
): Promise<AddressData | null> {
  return fetcher.fetchAddress(zipCode);
}

export type { AddressData, AddressFetcher };
