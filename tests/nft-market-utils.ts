import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NFTDelisted,
  NFTListed,
  NFTSold
} from "../generated/NFTMarket/NFTMarket"

export function createNFTDelistedEvent(
  tokenId: BigInt,
  seller: Address
): NFTDelisted {
  let nftDelistedEvent = changetype<NFTDelisted>(newMockEvent())

  nftDelistedEvent.parameters = new Array()

  nftDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftDelistedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return nftDelistedEvent
}

export function createNFTListedEvent(
  tokenId: BigInt,
  seller: Address,
  price: BigInt
): NFTListed {
  let nftListedEvent = changetype<NFTListed>(newMockEvent())

  nftListedEvent.parameters = new Array()

  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftListedEvent
}

export function createNFTSoldEvent(
  tokenId: BigInt,
  seller: Address,
  buyer: Address,
  price: BigInt
): NFTSold {
  let nftSoldEvent = changetype<NFTSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftSoldEvent
}
