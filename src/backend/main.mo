import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    checkIn : Time.Time;
    checkOut : Time.Time;
    roomType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type SpecialOffer = {
    title : Text;
    description : Text;
    discountPercentage : Nat;
    validUntil : Time.Time;
    active : Bool;
  };

  module Inquiry {
    public func compareByTimestamp(a : Inquiry, b : Inquiry) : Order.Order {
      if (a.timestamp < b.timestamp) { #less } else if (a.timestamp > b.timestamp) { #greater } else {
        #equal;
      };
    };
  };

  let inquiryList = List.empty<Inquiry>();
  let offerList = List.empty<SpecialOffer>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, checkIn : Time.Time, checkOut : Time.Time, roomType : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      checkIn;
      checkOut;
      roomType;
      message;
      timestamp = Time.now();
    };
    inquiryList.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiryList.toArray().sort(Inquiry.compareByTimestamp);
  };

  public shared ({ caller }) func addSpecialOffer(title : Text, description : Text, discountPercentage : Nat, validUntil : Time.Time) : async () {
    let offer : SpecialOffer = {
      title;
      description;
      discountPercentage;
      validUntil;
      active = true;
    };
    offerList.add(offer);
  };

  public query ({ caller }) func getActiveOffers() : async [SpecialOffer] {
    offerList.toArray().filter(func(offer) { offer.active and offer.validUntil > Time.now() });
  };

  public query ({ caller }) func getInquiryCount() : async Nat {
    inquiryList.size();
  };
};
