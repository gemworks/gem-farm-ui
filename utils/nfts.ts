import { Connection, PublicKey } from "@solana/web3.js"
import {isLazyNft, Metaplex, Nft} from '@metaplex-foundation/js';
import { programs } from "@metaplex/js"
import { NFT } from "@/hooks/useWalletNFTs"

export function matchMetadataWithType(token: Nft): NFT {
  return {
    mint: token.mintAddress,
    onchainMetadata: (token as unknown as programs.metadata.MetadataData),
    externalMetadata: {
      image: token.json.image,
      external_url: token.json.external_url,
      seller_fee_basis_points: token.json.seller_fee_basis_points,
      attributes: token.json.attributes,
      description: token.json.description,
      collection: token.json.collection,
      name: token.json.name
    }
  }
}

export async function getNFTMetadataForMany(
    tokens: any[],
    metaplex: Metaplex
): Promise<NFT[]> {
  const pubkeys = tokens.map(token => { return new PublicKey(token)});
  const nfts = await metaplex.nfts().findAllByMintList(pubkeys, { commitment: "confirmed" }).run();

  return nfts.map(token => {
    if (isLazyNft(token)) return;
    return matchMetadataWithType(token);
  });
}

export async function getNFTsByOwner(
    owner: PublicKey,
    metaplex: Metaplex
): Promise<NFT[]> {
  const nfts = await metaplex.nfts().findAllByOwner(owner, { commitment: "confirmed" }).run();
  return nfts.map(token => {
    if (isLazyNft(token)) return;
    return matchMetadataWithType(token);
  });
}