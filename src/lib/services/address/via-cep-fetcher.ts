import { AddressData, AddressFetcher } from "./cep-service";

export class ViaCepAddressFetcher implements AddressFetcher {
  async fetchAddress(zipCode: string): Promise<AddressData | null> {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
      const data = await response.json();
      if (data.erro) {
        return null;
      }
      return {
        address: data.logradouro,
        bairro: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  }
}
