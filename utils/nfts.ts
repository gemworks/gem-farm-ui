import { Connection, PublicKey } from "@solana/web3.js"
import {isLazyNft, Metaplex, Nft} from '@metaplex-foundation/js';
import { programs } from "@metaplex/js"
import { NFT } from "@/hooks/useWalletNFTs"

export async function matchMetadataWithType(token: Nft, metaplex: Metaplex, owner: PublicKey): Promise<NFT> {

  const pubkey = await metaplex
      .connection
      .getParsedTokenAccountsByOwner(
          owner,
          {mint: token.mintAddress},
          'confirmed'
      );

  const creators = token.creators.map(creator => {
    return {
      address: creator.address.toString(),
      verified: creator.verified,
      share: creator.share
    }
  });

  return {
    pubkey: pubkey.value[0].pubkey,
    mint: token.mintAddress,
    onchainMetadata: {
      data: {
        name: token.name,
        symbol: token.symbol,
        creators: creators,
        sellerFeeBasisPoints: token.sellerFeeBasisPoints,
        uri: token.uri
      },
      mint: token.mintAddress.toString(),
      edition: token.edition.address.toString(),
      collection: {
        verified: token.collection?.verified,
        key: token.collection?.key.toString()
      },
      editionNonce: token.editionNonce,
      isMutable: token.isMutable,
      primarySaleHappened: token.primarySaleHappened,
      tokenStandard: token.tokenStandard,
      uses: {
        useMethod: token.uses?.useMethod,
        remaining: token.uses?.remaining.toNumber(),
        total: token.uses?.total.toNumber(),
      },
      updateAuthority: token.updateAuthorityAddress.toString(),
      masterEdition: "",
      key: 1
    },
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
    metaplex: Metaplex,
    owner: PublicKey,
): Promise<NFT[]> {
  const pubkeys = tokens.map(token => { return new PublicKey(token)});
  const nfts = await metaplex.nfts().findAllByMintList(pubkeys, { commitment: "confirmed" }).run();

  const validatedNfts = await Promise.all(nfts.map(async (token) => {
    const nonLazyNft = isLazyNft(token) ? (await metaplex.nfts().loadNft(token).run()) : token;
    return matchMetadataWithType(nonLazyNft, metaplex, owner);
  }));

  return validatedNfts;
}

export async function getNFTsByOwner(
    owner: PublicKey,
    metaplex: Metaplex
): Promise<NFT[]> {
  const nfts = await metaplex.nfts().findAllByOwner(owner, { commitment: "confirmed" }).run();

  const validatedNfts = await Promise.all(nfts.map(async (token) => {
    const nonLazyNft = isLazyNft(token) ? (await metaplex.nfts().loadNft(token).run()) : token;
    return matchMetadataWithType(nonLazyNft, metaplex, owner);
  }));

  return validatedNfts;
}