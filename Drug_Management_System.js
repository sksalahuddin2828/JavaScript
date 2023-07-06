const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class PharmacyManagementSystem {
  constructor() {
    this.drugInventory = {};
  }

  addDrug() {
    rl.question("Enter drug name: ", (name) => {
      rl.question("Enter price: ", (price) => {
        rl.question("Enter quantity: ", (quantity) => {
          this.drugInventory[name] = { price: parseFloat(price), quantity: parseInt(quantity) };
          console.log("Drug added successfully!");
          this.menu();
        });
      });
    });
  }

  updateDrug() {
    rl.question("Enter drug name: ", (name) => {
      if (this.drugInventory.hasOwnProperty(name)) {
        rl.question("Enter new price: ", (price) => {
          rl.question("Enter new quantity: ", (quantity) => {
            this.drugInventory[name].price = parseFloat(price);
            this.drugInventory[name].quantity = parseInt(quantity);
            console.log("Drug information updated successfully!");
            this.menu();
          });
        });
      } else {
        console.log("Drug not found in the inventory!");
        this.menu();
      }
    });
  }

  viewDrug() {
    rl.question("Enter drug name (leave blank to view all drugs): ", (name) => {
      if (name.trim() === "") {
        if (Object.keys(this.drugInventory).length === 0) {
          console.log("No drugs in the inventory!");
        } else {
          for (let [drug, info] of Object.entries(this.drugInventory)) {
            console.log(`Drug Name: ${drug}`);
            console.log(`Price: ${info.price}`);
            console.log(`Quantity: ${info.quantity}`);
          }
        }
      } else {
        if (this.drugInventory.hasOwnProperty(name)) {
          console.log(`Drug Name: ${name}`);
          console.log(`Price: ${this.drugInventory[name].price}`);
          console.log(`Quantity: ${this.drugInventory[name].quantity}`);
        } else {
          console.log("Drug not found in the inventory!");
        }
      }
      this.menu();
    });
  }

  recordPurchase() {
    rl.question("Enter drug name: ", (name) => {
      if (this.drugInventory.hasOwnProperty(name)) {
        rl.question("Enter quantity purchased: ", (quantity) => {
          if (parseInt(quantity) <= this.drugInventory[name].quantity) {
            this.drugInventory[name].quantity -= parseInt(quantity);
            console.log("Purchase recorded successfully!");
          } else {
            console.log("Insufficient quantity in the inventory!");
          }
          this.menu();
        });
      } else {
        console.log("Drug not found in the inventory!");
        this.menu();
      }
    });
  }

  searchDrug() {
    rl.question("Enter a keyword to search for drugs: ", (keyword) => {
      const searchResults = Object.keys(this.drugInventory).filter(drug =>
        drug.toLowerCase().includes(keyword.toLowerCase())
      );
      if (searchResults.length > 0) {
        console.log("Search Results:");
        searchResults.forEach(result => console.log(result));
      } else {
        console.log("No drugs found matching the keyword.");
      }
      this.menu();
    });
  }

  deleteDrug() {
    rl.question("Enter drug name to delete: ", (name) => {
      if (this.drugInventory.hasOwnProperty(name)) {
        delete this.drugInventory[name];
        console.log(`${name} deleted from the inventory.`);
      } else {
        console.log("Drug not found in the inventory!");
      }
      this.menu();
    });
  }

  setExpirationDate() {
    rl.question("Enter drug name: ", (name) => {
      if (this.drugInventory.hasOwnProperty(name)) {
        rl.question("Enter expiration date (YYYY-MM-DD): ", (expirationDate) => {
          this.drugInventory[name].expirationDate = expirationDate;
          console.log("Expiration date set successfully!");
          this.menu();
        });
      } else {
        console.log("Drug not found in the inventory!");
        this.menu();
      }
    });
  }

  checkLowStockAlert() {
    rl.question("Enter the minimum quantity threshold: ", (threshold) => {
      const lowStockDrugs = Object.entries(this.drugInventory)
        .filter(([_, info]) => info.quantity <= parseInt(threshold))
        .map(([drug, _]) => drug);

      if (lowStockDrugs.length > 0) {
        console.log("Low Stock Drugs:");
        lowStockDrugs.forEach(drug => console.log(drug));
      } else {
        console.log("No drugs are below the quantity threshold.");
      }
      this.menu();
    });
  }

  generateSalesReport() {
    let totalSales = 0;
    for (let [drug, info] of Object.entries(this.drugInventory)) {
      const price = info.price;
      const quantitySold = info.quantity - this.drugInventory[drug].quantity;
      totalSales += price * quantitySold;
    }

    console.log(`Total Sales: $${totalSales.toFixed(2)}`);

    const sortedDrugs = Object.entries(this.drugInventory)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5);

    console.log("Top Selling Drugs:");
    for (let [drug, info] of sortedDrugs) {
      const quantitySold = info.quantity - this.drugInventory[drug].quantity;
      console.log(`Drug Name: ${drug}`);
      console.log(`Quantity Sold: ${quantitySold}`);
    }
    this.menu();
  }

  userAuthentication() {
    rl.question("Enter username: ", (username) => {
      rl.question("Enter password: ", (password) => {
        if (username === "admin" && password === "password") {
          console.log("Authentication successful. Access granted.");
        } else {
          console.log("Authentication failed. Access denied.");
        }
        this.menu();
      });
    });
  }

  saveData() {
    const data = JSON.stringify(this.drugInventory, null, 2);
    fs.writeFile("drug_inventory.json", data, (err) => {
      if (err) {
        console.log("Failed to save data.");
      } else {
        console.log("Data saved successfully.");
      }
      this.menu();
    });
  }

  loadData() {
    fs.readFile("drug_inventory.json", (err, data) => {
      if (err) {
        console.log("No previous data found.");
      } else {
        this.drugInventory = JSON.parse(data);
        console.log("Data loaded successfully.");
      }
      this.menu();
    });
  }

  menu() {
    console.log("\nPharmacy Management System");
    console.log("1. Add Drug");
    console.log("2. Update Drug Information");
    console.log("3. View Drug Information");
    console.log("4. Record Purchase");
    console.log("5. Search Drug");
    console.log("6. Delete Drug");
    console.log("7. Set Expiration Date");
    console.log("8. Check Low Stock Alert");
    console.log("9. Generate Sales Report");
    console.log("10. User Authentication");
    console.log("11. Save Data");
    console.log("12. Load Data");
    console.log("13. Quit");

    rl.question("Enter your choice: ", (choice) => {
      switch (choice) {
        case "1":
          this.addDrug();
          break;
        case "2":
          this.updateDrug();
          break;
        case "3":
          this.viewDrug();
          break;
        case "4":
          this.recordPurchase();
          break;
        case "5":
          this.searchDrug();
          break;
        case "6":
          this.deleteDrug();
          break;
        case "7":
          this.setExpirationDate();
          break;
        case "8":
          this.checkLowStockAlert();
          break;
        case "9":
          this.generateSalesReport();
          break;
        case "10":
          this.userAuthentication();
          break;
        case "11":
          this.saveData();
          break;
        case "12":
          this.loadData();
          break;
        case "13":
          rl.close();
          break;
        default:
          console.log("Invalid choice. Try again!");
          this.menu();
          break;
      }
    });
  }
}

const pharmacyManagementSystem = new PharmacyManagementSystem();
pharmacyManagementSystem.menu();
