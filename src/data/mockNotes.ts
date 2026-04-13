import type { AccountNote } from '../types';

/**
 * Mock account notes for demo
 * Includes type-specific seed notes per ADR Section 7
 * Plus user-generated notes
 */
export const mockNotes: AccountNote[] = [
  // Account 001 - Greenfield Consulting Checking (type-specific)
  {
    id: 'note-001',
    account_id: 'account-001',
    note_type: 'type_specific',
    content: `**Institution:** First National Bank
**Account:** Business Checking (...7821)
**Portal URL:** https://firstnational.com/business
**Business Hours:** M-F 8am-6pm ET, Sat 9am-1pm ET

**Access Method:** Direct login
**Login Type:** Username/password (Jen has credentials)

**Rec-through date:** Last reconciled 3/31/2026
**Close date:** Month-end close 4/30/2026

**Outstanding Items:**
- Check #1847 ($450) - still outstanding
- Pending ACH deposit from Acme Corp

**Overdraft Protection:** Linked to savings account ...7822`,
    created_by: 'user-jen',
  },

  // Account 001 - User note
  {
    id: 'note-002',
    account_id: 'account-001',
    note_type: 'user_note',
    content: 'Client prefers we reconcile before the 25th each month to allow time for questions',
    created_by: 'user-katie',
  },

  // Account 002 - Greenfield Consulting Savings (type-specific)
  {
    id: 'note-003',
    account_id: 'account-002',
    note_type: 'type_specific',
    content: `**Institution:** First National Bank
**Account:** Business Savings (...7822)
**Portal URL:** https://firstnational.com/business

**Interest Rate:** 0.75% APY
**Compounding:** Monthly

**Rec-through date:** Last reconciled 3/31/2026
**Close date:** Month-end close 4/30/2026

**Transfer Restrictions:**
- Federal Reg D limit: 6 withdrawals per month
- No minimum balance requirement`,
    created_by: 'user-jen',
  },

  // Account 003 - Greenfield Consulting Credit Card (type-specific)
  {
    id: 'note-004',
    account_id: 'account-003',
    note_type: 'type_specific',
    content: `**Institution:** Chase Business
**Card:** Chase Ink Business (...2156)
**Portal URL:** https://chase.com

**Credit Limit:** $25,000
**Statement Close:** 25th of each month

**Payment Due Date:** 20th of following month
**Autopay:** Not enrolled - manual payment required

**Rec-through date:** Last reconciled 3/25/2026
**Close date:** Statement close 4/25/2026`,
    created_by: 'user-jen',
  },

  // Account 003 - User note
  {
    id: 'note-005',
    account_id: 'account-003',
    note_type: 'user_note',
    content: 'Client emails PDF statement around the 27th. Follow up if not received by end of month.',
    created_by: 'user-katie',
  },

  // Account 005 - Riverside Medical Loan (type-specific)
  {
    id: 'note-006',
    account_id: 'account-005',
    note_type: 'type_specific',
    content: `**Institution:** Wells Fargo
**Loan Number:** ...4521
**Portal URL:** https://wellsfargo.com/business

**Loan Type:** Business term loan
**Principal Balance:** $185,000 (as of 3/31/2026)
**Interest Rate:** 6.25% fixed
**Maturity Date:** 12/31/2029

**Payment Frequency:** Monthly
**Next Payment Date:** 4/15/2026
**Payment Amount:** $3,645

**Amortization Schedule on File:** Yes (in client documents folder)

**Rec-through date:** Last reconciled 2/28/2026
**Close date:** Month-end close 3/31/2026`,
    created_by: 'user-jen',
  },

  // Account 007 - Oakmont Property Investment (type-specific)
  {
    id: 'note-007',
    account_id: 'account-007',
    note_type: 'type_specific',
    content: `**Institution:** Vanguard
**Account:** Brokerage (...8392)
**Portal URL:** https://investor.vanguard.com

**Account Subtype:** Taxable brokerage
**Custodian Contact:** 1-800-VANGUARD

**Last Statement Date:** 12/31/2025
**Statement Frequency:** Quarterly

**Rec-through date:** Last reconciled 12/31/2025
**Close date:** Quarter-end close 3/31/2026`,
    created_by: 'user-katie',
  },

  // Account 010 - Blue Ridge Manufacturing Mortgage (type-specific)
  {
    id: 'note-008',
    account_id: 'account-010',
    note_type: 'type_specific',
    content: `**Lender:** US Bank
**Loan Number:** ...9284
**Portal URL:** https://usbank.com/business

**Property Address:** 1550 Industrial Parkway, Blue Ridge, NC

**Principal Balance:** $425,000 (as of 3/31/2026)
**Interest Rate:** 4.875% fixed
**Remaining Term:** 18 years

**Escrow Account:** Yes
**Escrow Balance:** $8,200 (property tax + insurance)

**Next Payment Date:** 4/1/2026
**Payment Amount:** $2,890 (P&I) + $450 (escrow) = $3,340

**Rec-through date:** Last reconciled 3/15/2026
**Close date:** Month-end close 4/15/2026`,
    created_by: 'user-katie',
  },

  // Account 010 - User note
  {
    id: 'note-009',
    account_id: 'account-010',
    note_type: 'user_note',
    content: 'Escrow analysis due in May - watch for annual adjustment notice',
    created_by: 'user-katie',
  },

  // Account 004 - Riverside Medical Checking (type-specific)
  {
    id: 'note-010',
    account_id: 'account-004',
    note_type: 'type_specific',
    content: `**Institution:** Wells Fargo
**Account:** Business Checking (...3357)
**Portal URL:** https://wellsfargo.com/business
**Business Hours:** M-F 7am-7pm PT

**Access Method:** Direct login with 2FA
**Login Type:** Jen logs in, 2FA code texted to client

**Rec-through date:** Last reconciled 2/28/2026
**Close date:** Month-end close 3/31/2026

**Outstanding Items:**
- Several payroll ACH items pending
- Check #2943 ($1,200) outstanding

**Overdraft Protection:** Not enrolled`,
    created_by: 'user-jen',
  },
];
