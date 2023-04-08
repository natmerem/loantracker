import React from "react";
// brief description and links to more information for each sba loan type
// this information section is included below the list of loans in App.js
const LoanInfo = () => {
  return (
    <div>
      <h1>Loan Info</h1>
      <div id="sevena">
        <h2>7(a)</h2>
        <p>
          The 7(a) Loan Program, SBA’s most common loan program, includes
          financial help for small businesses with special requirements. This is
          the best option when real estate is part of a business purchase, but
          it can also be used for:
        </p>
        <ul>
          <li>Short- and long-term working capital </li>
          <li>Refinance current business debt</li>
          <li>Purchase furniture, fixtures, and supplies</li>
        </ul>
        <p>
          The maximum loan amount for a 7(a) loan is $5 million. Key eligibility
          factors are based on what the business does to receive its income, its
          credit history, and where the business operates. Your lender will help
          you figure out which type of loan is best suited for your needs.
        </p>
        <p>To be eligible for 7(a) loan assistance, businesses must:</p>
        <ul>
          <li>Operate for profit </li>
          <li>Be considered a small business, as defined by SBA </li>
          <li>
            Be engaged in, or propose to do business in, the United States or
            its possessions
          </li>
          <li>Have reasonable invested equity</li>
          <li>
            Use alternative financial resources, including personal assets,
            before seeking financial assistance
          </li>
          <li>Be able to demonstrate a need for a loan </li>
          <li>Use the funds for a sound business purpose </li>
          <li>
            Not be delinquent on any existing debt obligations to the U.S.
            government
          </li>
        </ul>
        <p>
          To learn more about 7(a) loans, visit{" "}
          <span>
            <a
              href="https://www.sba.gov/funding-programs/loans/7a-loans"
              target="_blank"
              rel="noopener noreferrer"
            >
              the SBA website
            </a>
          </span>
        </p>
      </div>
      <div id="fiveohfour">
        <h2>504</h2>
        <p>
          The 504 Loan Program provides long-term, fixed rate financing for
          major fixed assets that promote business growth and job creation. 504
          loans are available through Certified Development Companies (CDCs),
          SBA's community-based partners who regulate nonprofits and promote
          economic development within their communities. CDCs are certified and
          regulated by the SBA. The maximum loan amount for a 504 loan is $5.5
          million. For certain energy projects, the borrower can receive a 504
          loan for up to $5.5 million per project, for up to three projects not
          to exceed $16.5 million total.
        </p>
        <p>To be eligible for a 504 loan, your business must:</p>
        <ul>
          <li>
            Operate as a for-profit company in the United States or its
            possessions
          </li>
          <li>Have a tangible net worth of less than $15 million</li>
          <li>
            Have an average net income of less than $5 million after federal
            income taxes for the two years preceding your application
          </li>
        </ul>
        <p>
          Other general eligibility standards include  falling within SBA size
          guidelines, having qualified management expertise, a feasible business
          plan, good character and the ability to repay the loan. Loans cannot
          be made to businesses engaged in nonprofit, passive, or speculative
          activities. For additional information on eligibility criteria and
          loan application requirements, small businesses and lenders are
          encouraged to contact a Certified Development Company in their area.
        </p>
        <p>
          To learn more about 504 loans, visit{" "}
          <span>
            <a
              href="https://www.sba.gov/funding-programs/loans/504-loans"
              target="_blank"
              rel="noopener noreferrer"
            >
              the SBA website
            </a>
          </span>
        </p>
      </div>
      <div id="microloan">
        <h2>Microloans</h2>
        <p>
          The microloan program provides loans up to $50,000 to help small
          businesses and certain not-for-profit childcare centers start up and
          expand. The average microloan is about $13,000. SBA provides funds to
          specially designated intermediary lenders, which are nonprofit
          community-based organizations with experience in lending as well as
          management and technical assistance. These intermediaries administer
          the Microloan program for eligible borrowers.
        </p>
        <p>
          Each intermediary lender has its own lending and credit requirements.
          Generally, intermediaries require some type of collateral as well as
          the personal guarantee of the business owner.
        </p>
        <p>
          Microloans can be used for a variety of purposes that help small
          businesses expand. Use them when you need less than $50,000 to
          rebuild, re-open, repair, enhance, or improve your small business.
          Examples include:{" "}
        </p>
        <ul>
          <li>Working capital</li>
          <li>Inventory</li>
          <li>Supplies</li>
          <li>Furniture</li>
          <li>Fixtures</li>
          <li>Machinery</li>
          <li>Equipment</li>
        </ul>
        <p>
          To learn more about Microloans loans, visit{" "}
          <span>
            <a
              href="https://www.sba.gov/funding-programs/loans/microloans"
              target="_blank"
              rel="noopener noreferrer"
            >
              the SBA website
            </a>
          </span>
        </p>
      </div>
      <div id="other">
        <h2>Other</h2>
        <p>
          SBA provides low-interest disaster loans to help businesses and
          homeowners recover from declared disasters. Businesses of all sizes
          located in declared disaster areas, private nonprofit organizations,
          homeowners, and renters affected by declared disasters, including
          civil unrest and natural disasters such as hurricanes, flooding, and
          wildfires. SBA disaster loans can be used for losses not covered by
          insurance or funding from the Federal Emergency Management Agency for
          both personal and business, and business operating expenses that could
          have been met had the disaster not occurred.
        </p>
        <p>To be eligible for 7(a) loan assistance, businesses must:</p>
        <ul>
          <li>Physical damage loans</li>
          <li>Mitigation assistance</li>
          <li>Economic Injury Disaster Loans</li>
          <li>Military reservist loans</li>
        </ul>
        <p>
          To learn more about Disaster Assistance loans, visit{" "}
          <span>
            <a
              href="https://www.sba.gov/funding-programs/disaster-assistance"
              target="_blank"
              rel="noopener noreferrer"
            >
              the SBA website
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoanInfo;
