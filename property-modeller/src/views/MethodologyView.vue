<template>
  <div class="methodology">

    <section class="m-section">
      <h2 class="m-title">Income Tax &amp; Take-Home Pay</h2>
      <p class="m-desc">ATO 2025–26 resident tax brackets plus 2% Medicare levy, applied to each person's gross annual income.</p>
      <table class="m-table">
        <thead><tr><th>Taxable Income</th><th>Tax on Bracket</th><th>Marginal Rate</th></tr></thead>
        <tbody>
          <tr><td>$0 – $18,200</td><td>Nil</td><td>0%</td></tr>
          <tr><td>$18,201 – $45,000</td><td>19¢ per $1 over $18,200</td><td>19%</td></tr>
          <tr><td>$45,001 – $120,000</td><td>$5,092 + 32.5¢ per $1 over $45,000</td><td>32.5%</td></tr>
          <tr><td>$120,001 – $180,000</td><td>$29,467 + 37¢ per $1 over $120,000</td><td>37%</td></tr>
          <tr><td>$180,001+</td><td>$51,667 + 45¢ per $1 over $180,000</td><td>45%</td></tr>
        </tbody>
      </table>
      <div class="m-formula">Net Annual = Gross − Income Tax − Medicare Levy (2%)<br>Net Weekly = Net Annual ÷ 52</div>
    </section>

    <section class="m-section">
      <h2 class="m-title">QLD Transfer (Stamp) Duty</h2>
      <p class="m-desc">Standard QLD transfer duty rates. First Home Buyers (FHB) receive concessions on top.</p>
      <table class="m-table">
        <thead><tr><th>Property Value</th><th>Standard Duty</th></tr></thead>
        <tbody>
          <tr><td>$0 – $5,000</td><td>Nil</td></tr>
          <tr><td>$5,001 – $75,000</td><td>1.5% of excess over $5,000</td></tr>
          <tr><td>$75,001 – $540,000</td><td>$1,050 + 3.5% of excess over $75,000</td></tr>
          <tr><td>$540,001 – $1,000,000</td><td>$17,325 + 4.5% of excess over $540,000</td></tr>
          <tr><td>$1,000,001+</td><td>$38,025 + 5.75% of excess over $1,000,000</td></tr>
        </tbody>
      </table>
      <div class="m-sub-title">FHB Concessions</div>
      <table class="m-table">
        <thead><tr><th>Condition</th><th>Duty Payable</th></tr></thead>
        <tbody>
          <tr><td>FHB + New Build (any price)</td><td>$0 — fully exempt</td></tr>
          <tr><td>FHB + Established, price &lt; $700k</td><td>$0 — fully exempt</td></tr>
          <tr><td>FHB + Established, $700k – $800k</td><td>Standard duty minus taper: $17,325 × (($800k − price) ÷ $100k)</td></tr>
          <tr><td>FHB + Established, price &gt; $800k</td><td>Full standard duty</td></tr>
          <tr><td>Investor (Scenario B)</td><td>Always full standard duty</td></tr>
        </tbody>
      </table>
    </section>

    <section class="m-section">
      <h2 class="m-title">Lenders Mortgage Insurance (LMI)</h2>
      <p class="m-desc">LMI is payable when LVR &gt; 80% and is capitalised on top of the loan. Rate is applied to the base loan amount.</p>
      <div class="m-formula">LVR = Base Loan ÷ Property Price</div>
      <table class="m-table">
        <thead><tr><th>LVR</th><th>LMI Rate</th></tr></thead>
        <tbody>
          <tr><td>≤ 80%</td><td>Nil</td></tr>
          <tr><td>80.01% – 85%</td><td>0.66% of loan</td></tr>
          <tr><td>85.01% – 90%</td><td>1.60% of loan</td></tr>
          <tr><td>90.01% – 95%</td><td>2.40% of loan</td></tr>
          <tr><td>&gt; 95%</td><td>3.00% of loan</td></tr>
        </tbody>
      </table>
    </section>

    <section class="m-section">
      <h2 class="m-title">Government Schemes</h2>
      <table class="m-table">
        <thead><tr><th>Scheme</th><th>Eligibility</th><th>Benefit</th></tr></thead>
        <tbody>
          <tr>
            <td>First Home Owner Grant (FHOG)</td>
            <td>FHB + New Build + price &lt; $750k</td>
            <td>$30,000 cash grant (deducted from upfront costs)</td>
          </tr>
          <tr>
            <td>First Home Buyer Guarantee (FHBG)</td>
            <td>FHB + price ≤ $1,000,000 + deposit ≥ 5%</td>
            <td>LMI waived entirely</td>
          </tr>
          <tr>
            <td>Stamp Duty Concession</td>
            <td>FHB (see Duty table above)</td>
            <td>Full or partial duty exemption</td>
          </tr>
        </tbody>
      </table>
      <p class="m-note">Scenario B (Investor) forfeits all three schemes. Forfeited amounts are calculated by comparing investor costs against what an equivalent FHB purchase would have received.</p>
    </section>

    <section class="m-section">
      <h2 class="m-title">Mortgage Repayments</h2>
      <div class="m-formula">
        P&amp;I Weekly = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)<br>
        <span class="m-formula-note">where r = annual rate ÷ 100 ÷ 52, n = years × 52</span>
      </div>
      <div class="m-formula" style="margin-top:10px">
        IO Weekly = Loan × annual rate ÷ 100 ÷ 52
      </div>
      <div class="m-sub-title" style="margin-top:16px">Loan Balance at Month M</div>
      <div class="m-formula">
        Balance = L × (1+r)ᴹ − PMT × ((1+r)ᴹ − 1) ÷ r<br>
        <span class="m-formula-note">where r = annual rate ÷ 100 ÷ 12, PMT = monthly P&amp;I payment</span>
      </div>
      <div class="m-sub-title" style="margin-top:16px">Yearly Interest Paid (Year Y)</div>
      <div class="m-formula">
        Interest = Annual PMT − (Balance at start of year − Balance at end of year)
      </div>
      <p class="m-note">Owner-occupier rate applies to Scenarios A &amp; C (Phase 1). Investment rate applies to Scenario B and C Phase 2.</p>
    </section>

    <section class="m-section">
      <h2 class="m-title">Negative Gearing &amp; Tax Refund</h2>
      <p class="m-desc">Applied to Scenarios B and C. If the rental property runs at a net loss, that loss is split equally between two owners and offset against their personal income.</p>
      <div class="m-formula">
        Net Rental Result = Gross Rent − Interest − Mgmt Fee − Maintenance − Council − Insurance − Body Corp − Depreciation
      </div>
      <div class="m-formula" style="margin-top:10px">
        Tax Refund = (Loss ÷ 2) × Marginal Rate(Person A) + (Loss ÷ 2) × Marginal Rate(Person B)<br>
        <span class="m-formula-note">Only applies when Net Rental Result &lt; 0</span>
      </div>
      <div class="m-sub-title" style="margin-top:16px">Depreciation</div>
      <table class="m-table">
        <thead><tr><th>Method</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>Auto — New Build</td><td>1.2% of purchase price per year</td></tr>
          <tr><td>Auto — Established</td><td>0.4% of purchase price per year</td></tr>
          <tr><td>Manual</td><td>User-supplied annual figure</td></tr>
        </tbody>
      </table>
    </section>

    <section class="m-section">
      <h2 class="m-title">Capital Gains Tax (CGT)</h2>
      <p class="m-desc">Applied at sale. CGT is exempt for PPOR (Scenario A) and for Scenario C if the FHB 6-year main residence rule applies (FHB + holding period ≤ 7 years).</p>
      <div class="m-formula">
        Gross Gain = Sale Price − Purchase Price − Selling Costs (sale price × selling costs %)<br>
        Taxable Gain = Gross Gain × 50%   <span class="m-formula-note">(50% CGT discount for &gt;12 month hold)</span><br>
        CGT = [Tax(Income A + Taxable Gain ÷ 2) − Tax(Income A)] + [Tax(Income B + Taxable Gain ÷ 2) − Tax(Income B)]
      </div>
      <p class="m-note">The gain is split equally between two owners. Each person's marginal rate is assessed using their income at the time of sale (year-end income from projection).</p>
    </section>

    <section class="m-section">
      <h2 class="m-title">Wealth Projection</h2>
      <p class="m-desc">Modelled year-by-year for the holding period. Property value, loan balance, equity, and cumulative savings compound annually.</p>
      <div class="m-formula">
        Property Value (year Y) = Price × ∏(1 + Growth Rate)<br>
        <span class="m-formula-note">Growth Rate = Year 1–2: Y1 rate; Year 3+: Y3 rate</span>
      </div>
      <div class="m-formula" style="margin-top:10px">
        Equity = Property Value − Loan Balance<br>
        Annual Savings = Weekly Surplus × 52<br>
        Cumulative Savings += Annual Savings each year<br>
        Total Wealth = Equity + Cumulative Savings
      </div>
      <p class="m-note">Rent income and personal incomes grow annually by their respective growth rates. Loan balance is recalculated month-by-month. IO loans maintain constant balance throughout.</p>
    </section>

    <section class="m-section">
      <h2 class="m-title">Cash Flow Formulas by Scenario</h2>

      <div class="m-sub-title">Scenario A — Buy to Live (PPOR)</div>
      <div class="m-formula">
        Weekly Surplus = Net Income − Mortgage (OO) − Council − Insurance − Maintenance − Body Corp − Lifestyle Inflation ($150) − Living Costs
      </div>

      <div class="m-sub-title" style="margin-top:16px">Scenario B — Rentvest</div>
      <div class="m-formula">
        Weekly Surplus = Net Income − Mortgage (INV) − Rent Paid + Rent Received − Mgmt Fee − Council − Insurance − Maintenance − Body Corp + Tax Saving − Living Costs
      </div>

      <div class="m-sub-title" style="margin-top:16px">Scenario C — Hybrid (Two Phases)</div>
      <div class="m-formula">
        Phase 1 (living in): Net Income − Mortgage (OO) − Owner Costs − Commute Extra − Living Costs<br>
        Phase 2 (rented out): Net Income − Mortgage (INV) − Rent Paid + Rent Received − Mgmt Fee − Owner Costs + Tax Saving − Living Costs
      </div>
      <p class="m-note">Scenario C uses P1 surplus for Year 1 and P2 surplus from Year 2 onward in the projection. The 6-year CGT exemption window begins from purchase date.</p>
    </section>

    <section class="m-section">
      <h2 class="m-title">Upfront Cost Summary</h2>
      <table class="m-table">
        <thead><tr><th>Item</th><th>A — PPOR</th><th>B — Rentvest</th><th>C — Hybrid</th></tr></thead>
        <tbody>
          <tr><td>Min Deposit</td><td>5% of price</td><td>10% of price</td><td>5% of price</td></tr>
          <tr><td>Stamp Duty</td><td>FHB concession</td><td>Full standard duty</td><td>$0 (new build FHB)</td></tr>
          <tr><td>LMI</td><td>Waived (FHBG)</td><td>Capitalised on loan</td><td>Waived (FHBG)</td></tr>
          <tr><td>Legal Fees</td><td>$3,200</td><td>$2,700</td><td>$2,700</td></tr>
          <tr><td>Lifestyle Setup</td><td>$10,000</td><td>—</td><td>—</td></tr>
          <tr><td>FHOG</td><td>−$30,000 (if eligible)</td><td>Forfeited</td><td>−$30,000 (if eligible)</td></tr>
        </tbody>
      </table>
      <div class="m-formula">Cash Buffer = Available Capital − Total Upfront Outlay</div>
    </section>

    <section class="m-section">
      <h2 class="m-title">Weighted Scoring</h2>
      <p class="m-desc">Each scenario is scored 1–5 on five metrics, then multiplied by configurable weights. Cash flow and wealth are derived from inputs; commute, flexibility, and lifestyle can be rated manually.</p>
      <table class="m-table">
        <thead><tr><th>Metric</th><th>Default Weight</th><th>How Score is Derived</th></tr></thead>
        <tbody>
          <tr><td>Cash Flow</td><td>×2</td><td>&gt;$900/wk=5, &gt;$650=4, &gt;$400=3, &gt;$150=2, else 1</td></tr>
          <tr><td>Wealth Growth</td><td>×1</td><td>Linear scale from min to max across all three scenarios</td></tr>
          <tr><td>Commute</td><td>×1</td><td>User-rated (default A=2, B=5, C=4)</td></tr>
          <tr><td>Flexibility</td><td>×1</td><td>User-rated (default A=1, B=5, C=4)</td></tr>
          <tr><td>Lifestyle</td><td>×1</td><td>User-rated (default A=2, B=5, C=3)</td></tr>
        </tbody>
      </table>
      <div class="m-formula">Total Score = Σ (metric score × weight)<br>Max possible = 5 × (sum of all weights)</div>
    </section>

  </div>
</template>

<script setup>
// Static documentation — no logic needed
</script>

<style scoped>
.methodology {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.m-section {
  padding: 24px 0 24px;
  border-bottom: 1px solid var(--border);
}
.m-section:last-child { border-bottom: none; }

.m-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 8px;
}

.m-sub-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 8px;
  margin-top: 4px;
}

.m-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 14px;
}

.m-note {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--surface);
  border-left: 3px solid var(--border);
  border-radius: 0 6px 6px 0;
}

.m-formula {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--navy);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--el-border-radius-base);
  padding: 12px 16px;
  line-height: 1.9;
  margin-bottom: 4px;
}

.m-formula-note {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  color: var(--muted);
  font-style: italic;
}

.m-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 4px;
}

.m-table thead tr {
  background: var(--surface);
}

.m-table th {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  padding: 9px 12px;
  text-align: left;
  border-bottom: 2px solid var(--border);
}

.m-table td {
  padding: 9px 12px;
  color: var(--text);
  border-bottom: 1px solid #f1ede8;
  vertical-align: top;
}

.m-table tbody tr:last-child td { border-bottom: none; }
.m-table tbody tr:hover td { background: var(--surface); }
</style>
