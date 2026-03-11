import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type OldActor = {
    inquiryList : List.List<OldInquiry>;
  };

  type OldInquiry = {
    coupleNames : Text;
    weddingDate : Time.Time;
    phoneNumber : Text;
    serviceType : OldServiceType;
    message : Text;
    timestamp : Time.Time;
  };

  type OldServiceType = {
    #weddingPhotography;
    #preWeddingShoot;
    #candidPhotography;
    #cinematicFilm;
    #bridalPortrait;
    #destinationWedding;
  };

  type NewActor = {
    inquiryList : List.List<NewInquiry>;
  };

  type NewInquiry = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public func run(old : OldActor) : NewActor {
    let newInquiryList = List.empty<NewInquiry>();
    old.inquiryList.forEach(
      func(oldInquiry) {
        let newInquiry : NewInquiry = {
          name = oldInquiry.coupleNames;
          phone = oldInquiry.phoneNumber;
          message = oldInquiry.message;
          timestamp = oldInquiry.timestamp;
        };
        newInquiryList.add(newInquiry);
      }
    );
    { inquiryList = newInquiryList };
  };
};
