import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Inquiry = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let inquiryList = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };
    inquiryList.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiryList.toArray();
  };
};
