import pcUpdater from './valueUpdators/pc.js';
import { commaSeparatedStringToNumber } from './utils.js';
const createScroller = async (url) => {
  // let scrapedData = await chrome.storage.local.get(url);
  // scrapedData = scrapedData[url];
  const Scroller = document.createElement('div');
  Scroller.setAttribute('class', 'dxYcNX');

  const ScrollerContent = document.createElement('div');
  ScrollerContent.setAttribute('class', 'lhfZno');

  Scroller.appendChild(ScrollerContent);

  const ProductSpecsHeader = document.createElement('div');
  ProductSpecsHeader.setAttribute('class', 'gnaRJt fwfACD');
  ProductSpecsHeader.innerText = 'Product Specs';

  // price
  const ProductSpecsPriceDiv = document.createElement('div');
  ProductSpecsPriceDiv.setAttribute('id', 'price-div');
  ProductSpecsPriceDiv.setAttribute('class', 'gpuHtG');

  const ProductSpecsPriceDivText = document.createElement('div');
  ProductSpecsPriceDivText.setAttribute('class', 'hUvleg');
  ProductSpecsPriceDivText.innerText = 'Price';

  const ProductSpecsPriceDivValue = document.createElement('div');
  ProductSpecsPriceDivValue.innerHTML =
    '<div class="jXiauJ"><div class="excrlk"><div class="hgakEt"><div class="fyevUS">₹</div><input value="14990"></div></div></div>';
  ProductSpecsPriceDivValue.querySelector('input').addEventListener(
    'input',
    async (event) => {
      const newValue = event.target.value;
      let scrapedData = await chrome.storage.local.get(url);
      scrapedData = scrapedData[url];
      scrapedData['price'] = newValue;
      await chrome.storage.local.set({ [url]: scrapedData });
      pcUpdater(url);
    }
  );
  // ProductSpecsPriceDivValue.querySelector('input').value = scrapedData.price;
  ProductSpecsPriceDiv.appendChild(ProductSpecsPriceDivText);
  ProductSpecsPriceDiv.appendChild(ProductSpecsPriceDivValue);

  // dimensions
  const ProductSpecsDimensionsDiv = document.createElement('div');
  ProductSpecsDimensionsDiv.setAttribute('id', 'dimensions-div');
  ProductSpecsDimensionsDiv.setAttribute('class', 'gpuHtG');

  const ProductSpecsDimensionsDivText = document.createElement('div');
  ProductSpecsDimensionsDivText.setAttribute('class', 'hUvleg');
  ProductSpecsDimensionsDivText.innerText = 'Dimensions';

  const ProductSpecsDimensionsDivValue = document.createElement('div');
  ProductSpecsDimensionsDivValue.innerHTML =
    '<div class="jXiauJ"><div class="hgakEt"><input value="16.44"><div class="gIWanR">cm</div></div><div class="hgakEt"><input value="0.81"><div class="gIWanR">cm</div></div><div class="hgakEt"><input value="7.51"><div class="gIWanR">cm</div></div></div>';
  ProductSpecsDimensionsDivValue.querySelectorAll('input').forEach(
    (input, i) => {
      input.addEventListener('input', async (event) => {
        const newValue = event.target.value;
        let scrapedData = await chrome.storage.local.get(url);
        scrapedData = scrapedData[url];
        if (i == 0) {
          scrapedData['length'] = newValue;
        } else if (i == 1) {
          scrapedData['breadth'] = newValue;
        } else {
          scrapedData['height'] = newValue;
        }

        await chrome.storage.local.set({ [url]: scrapedData });
        pcUpdater(url);
      });
    }
  );
  ProductSpecsDimensionsDiv.appendChild(ProductSpecsDimensionsDivText);
  ProductSpecsDimensionsDiv.appendChild(ProductSpecsDimensionsDivValue);

  //weight
  const ProductSpecsWeightDiv = document.createElement('div');
  ProductSpecsWeightDiv.setAttribute('id', 'weight-div');
  ProductSpecsWeightDiv.setAttribute('class', 'gpuHtG');

  const ProductSpecsWeightDivText = document.createElement('div');
  ProductSpecsWeightDivText.setAttribute('class', 'hUvleg');
  ProductSpecsWeightDivText.innerText = 'Weight';

  const ProductSpecsWeightDivValue = document.createElement('div');
  ProductSpecsWeightDivValue.innerHTML =
    '<div class="jXiauJ"><div class="excrlk"><div class="hgakEt"><input value="0.49"><div class="gIWanR">kg</div></div></div></div>';
  ProductSpecsWeightDivValue.querySelector('input').addEventListener(
    'input',
    async (event) => {
      const newValue = event.target.value;
      let scrapedData = await chrome.storage.local.get(url);
      scrapedData = scrapedData[url];
      scrapedData['weight'] = newValue;
      await chrome.storage.local.set({ [url]: scrapedData });
      pcUpdater(url);
    }
  );
  ProductSpecsWeightDiv.appendChild(ProductSpecsWeightDivText);
  ProductSpecsWeightDiv.appendChild(ProductSpecsWeightDivValue);

  ScrollerContent.appendChild(ProductSpecsHeader);
  ScrollerContent.appendChild(ProductSpecsPriceDiv);
  ScrollerContent.appendChild(ProductSpecsDimensionsDiv);
  ScrollerContent.appendChild(ProductSpecsWeightDiv);

  // manufacting cost
  const ManufacturingCostHeader = document.createElement('div');
  ManufacturingCostHeader.setAttribute('class', 'fwfACD');
  ManufacturingCostHeader.innerText = 'Manufacturing Cost';
  ScrollerContent.appendChild(ManufacturingCostHeader);

  const ManufacturingCostDiv = document.createElement('div');
  ManufacturingCostDiv.setAttribute('id', 'manufacting-cost-div');
  ManufacturingCostDiv.setAttribute('class', 'gpuHtG');

  const ManufacturingCostDivText = document.createElement('div');
  ManufacturingCostDivText.setAttribute('class', 'hUvleg');
  ManufacturingCostDivText.innerText = 'Unit Manufacturing Cost';

  const ManufacturingCostDivValue = document.createElement('div');
  ManufacturingCostDivValue.innerHTML =
    '<div class="jXiauJ"><div class="hgakEt"><div class="fyevUS">₹</div><input value="2998"></div></div>';
  ManufacturingCostDivValue.querySelector('input').addEventListener(
    'input',
    async (event) => {
      const newValue = event.target.value;
      let scrapedData = await chrome.storage.local.get(url);
      scrapedData = scrapedData[url];
      scrapedData['manufacturingCost'] = newValue;
      await chrome.storage.local.set({ [url]: scrapedData });
      pcUpdater(url);
    }
  );
  ManufacturingCostDiv.appendChild(ManufacturingCostDivText);
  ManufacturingCostDiv.appendChild(ManufacturingCostDivValue);
  ScrollerContent.appendChild(ManufacturingCostDiv);

  // Fulfillment Cost
  const FulfillmentCostHeader = document.createElement('div');
  FulfillmentCostHeader.setAttribute('class', 'fwfACD');
  FulfillmentCostHeader.innerText = 'Fulfillment Cost';

  // commission fee percentage
  const FulfillmentCostCommissionFeePercentageDiv =
    document.createElement('div');
  FulfillmentCostCommissionFeePercentageDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostCommissionFeePercentageDivText =
    document.createElement('div');
  FulfillmentCostCommissionFeePercentageDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostCommissionFeePercentageDivText.innerText =
    'Commission Fee Percentage';

  const FulfillmentCostCommissionFeePercentageDivValue =
    document.createElement('div');
  FulfillmentCostCommissionFeePercentageDivValue.setAttribute(
    'id',
    'commission-fee-percentage-div'
  );
  FulfillmentCostCommissionFeePercentageDivValue.innerHTML =
    '<div class="jXiauJ"><div class="hgakEt"><div class="fyevUS">%</div><input value="10"></div></div>';
  FulfillmentCostCommissionFeePercentageDivValue.querySelector(
    'input'
  ).addEventListener('input', async (event) => {
    const newValue = event.target.value;
    let scrapedData = await chrome.storage.local.get(url);
    scrapedData = scrapedData[url];
    scrapedData['commissionFeePercentage'] = newValue;
    await chrome.storage.local.set({ [url]: scrapedData });
    pcUpdater(url);
  });

  FulfillmentCostCommissionFeePercentageDiv.appendChild(
    FulfillmentCostCommissionFeePercentageDivText
  );
  FulfillmentCostCommissionFeePercentageDiv.appendChild(
    FulfillmentCostCommissionFeePercentageDivValue
  );
  // commission fee
  const FulfillmentCostCommissionFeeDiv = document.createElement('div');
  FulfillmentCostCommissionFeeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostCommissionFeeDivText = document.createElement('div');
  FulfillmentCostCommissionFeeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostCommissionFeeDivText.innerText = 'Commission Fee';

  const FulfillmentCostCommissionFeeDivValue = document.createElement('div');
  FulfillmentCostCommissionFeeDivValue.setAttribute('id', 'commission-fee-div');
  FulfillmentCostCommissionFeeDivValue.innerHTML =
    '<div class="jXiauJ"><b>₹44.00</b></div>';
  FulfillmentCostCommissionFeeDiv.appendChild(
    FulfillmentCostCommissionFeeDivText
  );
  FulfillmentCostCommissionFeeDiv.appendChild(
    FulfillmentCostCommissionFeeDivValue
  );

  // collection fee
  const FulfillmentCostCollectionFeeDiv = document.createElement('div');
  FulfillmentCostCollectionFeeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostCollectionFeeDivText = document.createElement('div');
  FulfillmentCostCollectionFeeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostCollectionFeeDivText.innerText = 'Collection Fee';

  const FulfillmentCostCollectionFeeDivValue = document.createElement('div');
  FulfillmentCostCollectionFeeDivValue.setAttribute('id', 'collection-fee-div');
  FulfillmentCostCollectionFeeDivValue.innerHTML =
    '<div class="jXiauJ"><b>₹44.00</b></div>';
  // '<div class="jXiauJ"><div class="excrlk"><div class="hgakEt"><div class="fyevUS">₹</div><input value="140"></div></div></div>';
  FulfillmentCostCollectionFeeDiv.appendChild(
    FulfillmentCostCollectionFeeDivText
  );
  FulfillmentCostCollectionFeeDiv.appendChild(
    FulfillmentCostCollectionFeeDivValue
  );

  // fixed fee
  const FulfillmentCostFixedFeeDiv = document.createElement('div');
  FulfillmentCostFixedFeeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostFixedFeeDivText = document.createElement('div');
  FulfillmentCostFixedFeeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostFixedFeeDivText.innerText = 'Fixed Fee';

  const FulfillmentCostFixedFeeDivValue = document.createElement('div');
  FulfillmentCostFixedFeeDivValue.setAttribute('id', 'fixed-fee-div');
  FulfillmentCostFixedFeeDivValue.innerHTML =
    '<div class="jXiauJ"><b>₹44.00</b></div>';
  FulfillmentCostFixedFeeDiv.appendChild(FulfillmentCostFixedFeeDivText);
  FulfillmentCostFixedFeeDiv.appendChild(FulfillmentCostFixedFeeDivValue);

  // seller type
  const FulfillmentCostSellerTypeDiv = document.createElement('div');
  FulfillmentCostSellerTypeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostSellerTypeDivText = document.createElement('div');
  FulfillmentCostSellerTypeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostSellerTypeDivText.innerText = 'Seller Type';

  const FulfillmentCostSellerTypeDivValue = document.createElement('div');
  FulfillmentCostSellerTypeDivValue.innerHTML =
    '<div class="jXiauJ"><div><div class="jgsrbF"><select class="jFqjdG"><option value="BRONZE">Bronze</option><option value="SILVER">Silver</option><option value="GOLD">Gold</option></select></div></div></div>';
  FulfillmentCostSellerTypeDivValue.querySelector('select').addEventListener(
    'change',
    async (event) => {
      const newValue = event.target.value;
      let scrapedData = await chrome.storage.local.get(url);
      scrapedData = scrapedData[url];
      scrapedData['sellerType'] = newValue;
      await chrome.storage.local.set({ [url]: scrapedData });
      pcUpdater(url);
    }
  );
  FulfillmentCostSellerTypeDiv.appendChild(FulfillmentCostSellerTypeDivText);
  FulfillmentCostSellerTypeDiv.appendChild(FulfillmentCostSellerTypeDivValue);

  // shiping type
  const FulfillmentCostShippingTypeDiv = document.createElement('div');
  FulfillmentCostShippingTypeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostShippingTypeDivText = document.createElement('div');
  FulfillmentCostShippingTypeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostShippingTypeDivText.innerText = 'Shipping Type';

  const FulfillmentCostShippingTypeDivValue = document.createElement('div');
  FulfillmentCostShippingTypeDivValue.innerHTML =
    '<div class="jXiauJ"><div><div class="jgsrbF"><select class="jFqjdG"><option value="LOCAL">Local</option><option value="REGIONAL">Regional</option><option value="NATIONAL">National</option></select></div></div></div>';
  FulfillmentCostShippingTypeDivValue.querySelector('select').addEventListener(
    'change',
    async (event) => {
      const newValue = event.target.value;
      let scrapedData = await chrome.storage.local.get(url);
      scrapedData = scrapedData[url];
      scrapedData['shippingType'] = newValue;
      await chrome.storage.local.set({ [url]: scrapedData });
      pcUpdater(url);
    }
  );
  FulfillmentCostShippingTypeDiv.appendChild(
    FulfillmentCostShippingTypeDivText
  );
  FulfillmentCostShippingTypeDiv.appendChild(
    FulfillmentCostShippingTypeDivValue
  );

  // shipping fee
  const FulfillmentCostShippingFeeDiv = document.createElement('div');
  FulfillmentCostShippingFeeDiv.setAttribute('class', 'gpuHtG');

  const FulfillmentCostShippingFeeDivText = document.createElement('div');
  FulfillmentCostShippingFeeDivText.setAttribute('class', 'hUvleg');
  FulfillmentCostShippingFeeDivText.innerText = 'Shipping Fee';

  const FulfillmentCostShippingFeeDivValue = document.createElement('div');
  FulfillmentCostShippingFeeDivValue.setAttribute('id', 'shipping-type-div');
  FulfillmentCostShippingFeeDivValue.innerHTML =
    '<div class="jXiauJ"><b>₹40.00</b></div>';
  FulfillmentCostShippingFeeDiv.appendChild(FulfillmentCostShippingFeeDivText);
  FulfillmentCostShippingFeeDiv.appendChild(FulfillmentCostShippingFeeDivValue);

  // gst tax
  const GstTaxDiv = document.createElement('div');
  GstTaxDiv.setAttribute('class', 'gpuHtG');

  const GstTaxDivText = document.createElement('div');
  GstTaxDivText.setAttribute('class', 'hUvleg');
  GstTaxDivText.innerText = 'GST Tax';

  const GstTaxDivValue = document.createElement('div');
  GstTaxDivValue.setAttribute('id', 'gst-tax');
  GstTaxDivValue.innerHTML = '<div class="jXiauJ"><b>₹300.00</b></div>';
  GstTaxDiv.appendChild(GstTaxDivText);
  GstTaxDiv.appendChild(GstTaxDivValue);

  // pick and pack fee
  const PickAndPackFeeDiv = document.createElement('div');
  PickAndPackFeeDiv.setAttribute('class', 'gpuHtG');

  const PickAndPackFeeDivText = document.createElement('div');
  PickAndPackFeeDivText.setAttribute('class', 'hUvleg');
  PickAndPackFeeDivText.innerText = 'Pick and Pack Fee';

  const PickAndPackFeeDivValue = document.createElement('div');
  PickAndPackFeeDivValue.setAttribute('id', 'pick-and-pack');
  PickAndPackFeeDivValue.innerHTML = '<div class="jXiauJ"><b>₹44.00</b></div>';
  // '<div class="jXiauJ"><div class="excrlk"><div class="hgakEt"><div class="fyevUS">₹</div><input value="50"></div></div></div>';
  PickAndPackFeeDiv.appendChild(PickAndPackFeeDivText);
  PickAndPackFeeDiv.appendChild(PickAndPackFeeDivValue);

  ScrollerContent.appendChild(FulfillmentCostHeader);
  ScrollerContent.appendChild(FulfillmentCostCommissionFeePercentageDiv);
  ScrollerContent.appendChild(FulfillmentCostCommissionFeeDiv);
  ScrollerContent.appendChild(FulfillmentCostCollectionFeeDiv);
  ScrollerContent.appendChild(FulfillmentCostFixedFeeDiv);
  ScrollerContent.appendChild(FulfillmentCostSellerTypeDiv);
  ScrollerContent.appendChild(FulfillmentCostShippingTypeDiv);
  ScrollerContent.appendChild(FulfillmentCostShippingFeeDiv);
  ScrollerContent.appendChild(GstTaxDiv);
  ScrollerContent.appendChild(PickAndPackFeeDiv);
  return Scroller;
};

export default createScroller;
