import {
  NFTListed as NFTListedEvent,
  NFTSold as NFTSoldEvent
} from "../generated/NFTMarket/NFTMarket"
import { store } from "@graphprotocol/graph-ts"
import { NFTListed, NFTSold, TokenListingState } from "../generated/schema"


export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let listingState = new TokenListingState(event.params.tokenId.toString())
  listingState.tokenId = event.params.tokenId
  listingState.currentListing = entity.id
  listingState.listedAtTimestamp = event.block.timestamp
  listingState.listedAtBlockNumber = event.block.number

  listingState.save()
}

export function handleNFTSold(event: NFTSoldEvent): void {
  let entity = new NFTSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId

  let listingState = TokenListingState.load(event.params.tokenId.toString())
  if (listingState != null) {
    entity.listing = listingState.currentListing
    entity.listedAtTimestamp = listingState.listedAtTimestamp
    entity.listedAtBlockNumber = listingState.listedAtBlockNumber

    // The token is no longer listed, so drop the current-listing record
    store.remove("TokenListingState", event.params.tokenId.toString())
  }

  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
